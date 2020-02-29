const Site = require('../models/Site')
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

const getCurrentUserSite = async (req, res, next) => {
  const userId = req.UserId

  try {
    debug('Populando Current Site para el usuario ' + userId)
    const site = await Site.find({ owner: userId }).populate('owner')

    if (site) {
      return res.status(200).json(site)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const getAllUsersSite = async (req, res, next) => {
  const role = req.UserRole

  if (role !== 'admin') return res.status(400).json('Restricted to admin users')

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
  getCurrentUserSite,
  getAllUsersSite,
  updateSiteById
}
