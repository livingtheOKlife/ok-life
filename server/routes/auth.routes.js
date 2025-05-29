import express from 'express'

import { logout, register } from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/logout', logout)

export default router
