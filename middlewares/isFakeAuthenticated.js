const debug = require('debug')('Maleteo-Back-APICRUD:isAuthenticated')
const passport = require('passport')

const isFakeAuthenticated = (req, res, next) => {

  // Store on Req basic user data so it can be populated internally on a secure way  across all request
  req.UserId = '5e59060232ab164043bb7e01'
  req.UserRole = 'admin'
  req.UserKeeper = true
  req.userName = 'John Smith'
  req.userSuname = 'Smith'
  req.userImg = ''

  next()

}

module.exports = {
  isFakeAuthenticated
}
