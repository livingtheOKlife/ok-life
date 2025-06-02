import User from '../models/user.model.js'

export const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
    const { password, ...data } = user
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params
  const data = req.body
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
    Object.assign(user, data)
    await user.save()
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
}
