const express = require('express')
const router = express.Router()

const debug = require('debug')('Maleteo-Back-APICRUD:index.routes')

/* GET home page. */
router.get('/ping', (req, res, next) => {
  debug('Server is live!')
  console.log ("I wil say it again... We are live!!!")
  res.status(200).json('Server alive!')
})

module.exports = router
