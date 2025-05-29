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
