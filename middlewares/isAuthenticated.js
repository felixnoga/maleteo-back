const debug = require('debug')('Maleteo-Back-APICRUD:isAuthenticated')
const passport = require('passport')

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      return res.status(401).json('Unauthorized user')
    }

    // Access to user object,  retrieve user ID,  and add that ID on the REQuest so it can be processed
    // by the endpoint
    debug('User data is ', user)
    console.log('User:', user)

    // Store on Req basic user data so it can be populated internally on a secure way  across all request
    req.UserId = user._id
    req.UserRole = user.role
    req.UserKeeper = user.isKeeper
    req.userName = user.name
    req.userSuname = user.surname
    req.userImg = user.profile_img

    next()
  })(req, res, next)
}

module.exports = {
  isAuthenticated
}
