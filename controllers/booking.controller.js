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
    const booking = await Booking.find({ client: userId }).populate('client').populate('keeper').populate('site')

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
    const booking = await Booking.find({ keeper: userId }).populate('client').populate('keeper').populate('site')

    if (booking) {
      return res.status(200).json(booking)
    }jº 
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const getAllUsersSite = async (req, res, next) => {
  const role = req.UserRole

  //if (role=='user') return res.status(400).json('Restricted to admin users')

  try {
    debug('Populando Todos los Sites')
    const site = await Site.find().populate('owner')

    if (site) {
      return res.status(200).json(site)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const updateSiteById = async (req, res, next) => {
  const { sitio } = req.params
  const userId = req.UserId

  try {
    debug('Actualizando ' + sitio)

    const site = await Site.updateMany({ owner: userId, _id: sitio}, { ...req.body })

    if (sitio) {
      return res.status(200).json(sitio)
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