const Booking = require('../models/Booking')
const debug = require('debug')('Maleteo-Back-APICRUD:booking.controller')

const createCurrentUserBooking = (req, res, next) => {
  const newBooking = new Booking({ ...req.body, client: req.UserId })
  newBooking
    .save()
    .then(response => {
      res.status(201).send(response)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const getCurrentUserBooking = async (req, res, next) => {
  const userId = req.UserId

  try {
    debug('Populando Current Books para el usuario ' + userId)
    const booking = await Booking.find({ client: userId })
      .sort('-createdAt')
      .limit(100)
      .populate({
        path: 'client',
        select: 'name surname email profile_img'
      })
      .populate({
        path: 'keeper',
        select: 'name surname email profile_img'
      })
      .populate({
        path: 'site',
        select:
          'location property type space_img name description street city state country region zip'
      })

    if (booking) {
      return res.status(200).json(booking)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const getCurrentKeeperBooking = async (req, res, next) => {
  const userId = req.UserId
  const keeper = req.UserKeeper

  if (!keeper) return res.status(400).json('Your are not a keeper. Restricted to keeper users')

  try {
    debug('Populando Keeper Books para el usuario autenticado ' + userId)
    const booking = await Booking.find({ keeper: userId })
      .sort('-createdAt')
      .limit(100)
      .populate({
        path: 'client',
        select: 'name surname email profile_img'
      })
      .populate({
        path: 'keeper',
        select: 'name surname email profile_img'
      })
      .populate({
        path: 'site',
        select:
          'location property type space_img name description street city state country region zip'
      })

    if (booking) {
      return res.status(200).json(booking)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

module.exports = {
  createCurrentUserBooking,
  getCurrentUserBooking,
  getCurrentKeeperBooking
}
