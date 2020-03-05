
const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/booking.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { isFakeAuthenticated } = require('../middlewares/isFakeAuthenticated')

router.get('/', [isFakeAuthenticated], bookingController.getCurrentUserBooking)
router.put('/', [isFakeAuthenticated], bookingController.createCurrentUserBooking)
router.get('/Keeper', [isAuthenticated], bookingController.getCurrentKeeperBooking)

/*
router.get('/user/:userId', [isAuthenticated], userController.getUserById)


router.get('/booking',[isAuthenticated], bookingController.retrieve)
router.post('/booking', [isAuthenticated], bookingController.create)
router.get('/booking/:bookingId', [isAuthenticated], bookingController.get)
router.put('/booking/:bookingId', [isAuthenticated], bookingController.update)
router.patch('/booking/:bookingId/accept', [isAuthenticated], bookingController.accept)
router.delete('/booking/:bookingId',[isAuthenticated], bookingController.delete)
router.delete('booking/:bookingId/cancel', [isAuthenticated], bookingController.cancel)
*/

module.exports = router
