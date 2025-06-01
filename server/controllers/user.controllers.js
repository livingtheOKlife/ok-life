import User from '../models/user.model.js'

export const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' })
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
