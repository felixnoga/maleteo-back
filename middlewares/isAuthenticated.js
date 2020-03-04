const debug = require('debug')('Maleteo-Back-APICRUD:isAuthenticated')
const passport = require('passport')
const User = require('../models/User')

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    debug('Force Used is', process.env.FORCE_USER)
    if (process.env.FORCE_USER=="YES") {
      debug('Forcing authentication to user ', process.env.FAKE_USER_OBJECTID)
      User.findById(process.env.FAKE_USER_OBJECTID)
      // Be careful.  You are not using a promise here
    } else if (err || !user) {
      return res.status(401).json('Unauthorized user')
    }

    // Access to user object,  retrieve user ID,  and add that ID on the REQuest so it can be processed
    // by the endpoint
    debug('Middleware authenticated user as ', user)

    // Store on Req basic user data so it can be populated internally on a secure way  across all request
    req.UserData = user
    req.UserId = user._id
    req.UserRole = user.role
    req.UserKeeper = user.isKeeper
    req.UserName = user.name
    req.UserSurname = user.surname
    req.UserImg = user.profile_img

    next()
  })(req, res, next)
}

module.exports = {
  isAuthenticated
}
