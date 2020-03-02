const passport = require('passport')
const debug = require('debug')('Maleteo-Back-APICRUD:auth.controller')

const login = (req, res, next) => {
  passport.authenticate('login', (err, token) => {
    if (err || !token) {
      debug('Error in authentication')
      const error = new Error('There was an error login in')
      return next(error)
    }
    debug('token is ', token)
    res.status(200).json({ token: `Bearer ${token}` })
  })(req, res, next)
}

const register = (req, res, next) => {
  debug('Inside register Middleware')
  passport.authenticate('register', (err, user) => {
    if (err || !user) {
      const error = new Error('There was an error creating the user')
      return next(error)
    }
    debug('User created:',user)
    login(req, res, next)
  })(req, res, next)
}

const isLoggedIn = (req, res, next) => {
  res.status(200).json('User is logged in')
}

const whoAmI = (req, res, next) => {
  debug('Inside Whoami - User is ', req.UserId)
  res.status(200).json('You are logged as userId ' + req.UserId)
}

module.exports = {
  register,
  login,
  isLoggedIn,
  whoAmI
}
