import express from 'express'

import { login, logout, register } from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', register)
router.post('/logout', logout)
router.post('/login', login)

export default router
