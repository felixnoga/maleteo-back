const Review = require('../models/Review')
const debug = require('debug')('Maleteo-Back-APICRUD:review.controller')

const createCurrentUserReview = (req, res, next) => {
  const newReview = new Review({
    name: req.userName,
    surname: req.userSuname,
    profile_img: req.userImg,
    ...req.body
  })

  newReview
    .save()
    .then(response => {
      res.status(201).send(response)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

const getCurrentUserReview = async (req, res, next) => {
  const userId = req.UserId
/*
  try {
    debug('Populando Current Site para el usuario ' + userId)
    const site = await Site.find({ owner: userId })

    if (site) {
      return res.status(200).json(site)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  } */
}

module.exports = {
  createCurrentUserReview,
  getCurrentUserReview
}
