import express from 'express'

import { getUser, updateUser } from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/:userId', getUser)
router.put('/update-user/:userId', updateUser)

export default router
