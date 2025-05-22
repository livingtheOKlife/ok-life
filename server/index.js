import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/database.config.js'

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.get('/', () => console.log('Server is ready'))

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is listening on port: ${PORT}`)
})
