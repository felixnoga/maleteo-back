const express = require('express')

const reviewController = require('../controllers/review.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

// API endpoint at /REVIEW/USER
router.put('/User', [isAuthenticated], reviewController.createCurrentUserReview)

/*
router.put('/Blog', [isAuthenticated], reviewController.createCurrentBlogReview)
router.put('/Site', [isAuthenticated], reviewController.createCurrentSiteReview)
*/

module.exports = router
