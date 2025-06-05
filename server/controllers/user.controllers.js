import dotenv from 'dotenv'

import User from '../models/user.model.js'

import generateFileUrl from '../utils/generateFileUrl.js'

dotenv.config()

const SERVER_URL = process.env.SERVER_URL

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

export const uploadProfilePicture = async (req, res) => {
  const { userId } = req.params
  const { filename } = req.file
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: generateFileUrl(filename) },
      { new: true }
    )
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
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

export const uploadBannerPicture = async (req, res) => {
  const { userId } = req.params
  const { filename } = req.file
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { bannerPicture: generateFileUrl(filename) },
      { new: true }
    )
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
    res.status(200).json({
      success: true,
      message: 'Banner picture uploaded successfully',
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

export const followUser = async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You cannot follow yourself')
    }
    const userToFollow = await User.findById(userId)
    const userLoggedIn = await User.findById(_id)
    if (!userToFollow) {
      res.status(404)
      throw new Error('User not found')
    } else if (!userLoggedIn) {
      res.status(400)
      throw new Error('You must be logged in to follow a user')
    } else if (userLoggedIn.following.includes(userId)) {
      res.status(500)
      throw new Error('You already follow this user')
    }
    userToFollow.followers.push(_id)
    userLoggedIn.following.push(userId)
    await userToFollow.save()
    await userLoggedIn.save()
    res.status(200).json({
      success: true,
      message: 'User followed successfully',
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
}

export const unfollowUser = async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You cannot unfollow yourself')
    }
    const userToUnfollow = await User.findById(userId)
    const userLoggedIn = await User.findById(_id)
    if (!userToUnfollow) {
      res.status(404)
      throw new Error('User not found')
    } else if (!userLoggedIn) {
      res.status(400)
      throw new Error('You must must logged in to unfollow a user')
    } else if (!userLoggedIn.following.includes(userId)) {
      res.status(500)
      throw new Error('You are not following this user')
    }
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== _id
    )
    userLoggedIn.following = userLoggedIn.following.filter(
      (id) => id.toString() !== userId
    )
    await userToUnfollow.save()
    await userLoggedIn.save()
    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully',
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
}

export const blockUser = async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You cannot block yourself')
    }
    const userToBlock = await User.findById(userId)
    const userLoggedIn = await User.findById(_id)
    if (!userToBlock) {
      res.status(404)
      throw new Error('User not found')
    } else if (!userLoggedIn) {
      res.status(400)
      throw new Error('You must be logged in to block a user')
    } else if (userLoggedIn.blockedList.includes(userId)) {
      res.status(500)
      throw new Error('You already blocked this user')
    }
    userLoggedIn.blockedList.push(userId)
    userLoggedIn.following = userLoggedIn.following.filter(
      (id) => id.toString() !== userId
    )
    userToBlock.followers = userToBlock.followers.filter(
      (id) => id.toString() !== _id
    )
    await userToBlock.save()
    await userLoggedIn.save()
    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
}

// export const unblockUser = async (req, res) => {}

// export const deleteUser = async (req, res) => {}

// export const searchUsers = async (req, res) => {}
