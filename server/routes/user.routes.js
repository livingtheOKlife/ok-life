import express from 'express'

import upload from '../middleware/upload.middleware.js'

import {
  blockUser,
  followUser,
  getUser,
  unfollowUser,
  updateUser,
  uploadBannerPicture,
  uploadProfilePicture,
} from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/:userId', getUser)
router.put('/update-user/:userId', updateUser)
router.put(
  '/upload-profile-picture/:userId',
  upload.single('profilePicture'),
  uploadProfilePicture
)
router.put(
  '/upload-banner-picture/:userId',
  upload.single('bannerPicture'),
  uploadBannerPicture
)
router.post('/follow-user/:userId', followUser)
router.post('/unfollow-user/:userId', unfollowUser)
router.post('/block-user/:userId', blockUser)

export default router
