import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/database.config.js'

import { notFound, errorHandler } from './middleware/error.middleware.js'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/uploads', express.static(path.join('/api/user', 'uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is listening on port: ${PORT}`)
})
