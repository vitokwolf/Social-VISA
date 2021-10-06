const express = require('express')
const db = require('./config/connection')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

// initiate dotenv
dotenv.config()

// initiate express
const app = express()
const PORT = process.env.PORT || 3001

// express midlleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

// connect to database
db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🌍 Backend server listening on PORT:${PORT}`),
  )
})
