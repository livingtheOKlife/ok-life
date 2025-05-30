import emailTransporter from '../config/email.config.js'

import User from '../models/user.model.js'

import generateToken from '../utils/generateToken.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    if (!username || !email || !password) {
      throw new Error('All fields are required')
    }
    if (await User.findOne({ username })) {
      res.status(400)
      throw new Error('Username already in use')
    }
    if (await User.findOne({ email })) {
      res.status(400)
      throw new Error('Account already exists, try signing in...')
    }
    const user = await User.create({
      username,
      email,
      password,
    })
    if (user) {
      generateToken(res, user._id)
      const token = Math.floor(100000 + Math.random() * 900000).toString()
      await emailTransporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Verify your email',
        html: `
          <span>Your verification token is ${token}</span>
        `,
      })
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          ...user._doc,
          password: undefined,
        },
      })
    }
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      throw new Error('All fields are required')
    }
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user: {
          ...user._doc,
          password: undefined,
        },
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
}
