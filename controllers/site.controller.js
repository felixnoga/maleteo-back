const Site = require('../models/Site')
const User = require('../models/User')
const { uploadToCloudinary } = require('../config/cloudinary')

const debug = require('debug')('Maleteo-Back-APICRUD:site.controller')

const createCurrentUserSite = (req, res, next) => {
  const newSite = new Site({ ...req.body, owner: req.UserId })

  const keeper = req.UserKeeper
  if (!keeper) return res.status(400).json('Your are not a keeper. Restricted to keeper users')
  newSite
    .save()
    .then(response => {
      res.status(201).send(response)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const createCurrentUserSitewithPhoto = async (req, res, next) => {
  const keeper = req.UserKeeper

  // if (!keeper) return res.status(400).json('Your are not a keeper. Restricted to keeper users')

  const images = []

  try {
    for (const file of req.files) {
      const imageUrl = await uploadToCloudinary(file)
      debug('Uploaded image to ', imageUrl)
      images.push(imageUrl)
    }

    const location = { type: req.body.locationType, coordinates: [req.body.locationLat, req.body.locationLng] }

    const newSite = new Site({ ...req.body, location, space_img: images, owner: req.UserId })
    newSite
      .save()
      .then(async(site) => {
        const filter = { _id: req.UserId };
        const update = { isKeeper: true };

        const doc = await User.findOneAndUpdate(filter, update, {
          new: true
        })
        debug('User keeper to true', doc)
        debug('New Site created ', site)
        res.status(201).send(site)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  } catch (err) {
    next(err)
  }
}

const getCurrentUserSite = async (req, res, next) => {
  const userId = req.UserId

  try {
    debug('Populando Current Site para el usuario ' + userId)
    const site = await Site.find({ owner: userId }).populate({
      path: 'owner',
      select: 'name surname email profile_img'
    })

    if (site) {
      return res.status(200).json(site)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const getAllUsersSite = async (req, res, next) => {
  try {
    debug('Populando Todos los Sites')
    const site = await Site.find().populate({
      path: 'owner',
      select: 'name surname email profile_img'
    })

    if (site) {
      debug(site)
      return res.status(200).json(site)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const getNearestSites = async (req, res, next) => {
  const lat = req.body.lat
  const lng = req.body.lng
  try {
    const nearestSites = await Site.find({
      location: {
        $near: {
          $maxDistance: 10000,
          $geometry: {
            type: 'Point',
            coordinates: [lat, lng]
          }
        }
      }
    }).populate({
      path: 'owner',
      select: 'name surname email profile_img'
    })

    if (nearestSites) {
      debug(nearestSites)
      return res.status(200).json(nearestSites)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const updateSiteById = async (req, res, next) => {
  const { site } = req.params
  const userId = req.UserId
  const keeper = req.UserKeeper

  if (!keeper) return res.status(400).json('Your are not a keeper. Restricted to keeper users')

  try {
    debug('Actualizando ' + site)

    const doc = await Site.updateMany({ owner: userId, _id: site }, { ...req.body })

    if (doc) {
      return res.status(200).json(doc)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

module.exports = {
  createCurrentUserSite,
  createCurrentUserSitewithPhoto,
  getCurrentUserSite,
  getAllUsersSite,
  getNearestSites,
  updateSiteById
}
