const passport = require('passport')
const User = require('../models/User')

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
    debug('User created:', user)
    login(req, res, next)
  })(req, res, next)
}

const isLoggedIn = (req, res, next) => {
  debug('Is logged as user ', req.UserName)
  res.status(200).json('OK')
}

const whoAmI = async (req, res, next) => {
  const auth_user = process.env.FORCE_USER == 'YES' ? process.env.FAKE_USER_OBJECTID : req.UserId

  try {
    const UserId = req.UserId
    debug('In WhoAmI buscando por ' + UserId)
    const doc = await User.findOne(auth_user).select({
      name: 1,
      surname: 1,
      email: 1,
      isKeeper: 1,
      profile_img: 1,
      lastlogin: 1
    })
    debug('El usuario WhoAmI es ', doc)
    return res.status(200).json(doc)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = {
  register,
  login,
  isLoggedIn,
  whoAmI
}
