require('dotenv').config()
require('./config/db')

const debug = require('debug')('Maleteo-Back-APICRUD:app')

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const passport = require('passport')
require('./config/passport')

const indexRouter = require('./routes/index.routes')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const siteRouter = require('./routes/site.routes')
const bookingRouter = require('./routes/booking.routes')
const blogRouter = require('./routes/blog.routes')

const app = express()

app.use(logger('dev'))
app.use(cors())  // Enable all Cors request
app.use(express.json())


app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

debug('Test debuging in app.js')

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/site', siteRouter)
app.use('/booking', bookingRouter)
app.use('/articles', blogRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500).json(err.message)
})

module.exports = app
