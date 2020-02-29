const Site = require('../models/Site')
const debug = require('debug')('Maleteo-Back-APICRUD:site.controller')

const createCurrentUserSite = (req, res, next) => {
  const newSite = new Site({ ...req.body, owner: req.UserId })
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
    const site = await await Site.find({ owner: userId }).populate('owner')

    if (site) {
      return res.status(200).json(site)
    }
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
  createCurrentUserSite,
  getCurrentUserSite,
  getAllUsersSite,
  updateSiteById
}
