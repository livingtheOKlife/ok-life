import express from 'express'

import {
  forgotPassword,
  login,
  logout,
  register,
  resend,
  verify,
} from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/logout', logout)
router.post('/login', login)
router.post('/verify', verify)
router.post('/resend', resend)
router.post('/forgot-password', forgotPassword)

export default router
