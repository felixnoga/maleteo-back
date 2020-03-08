const express = require('express')

const siteController = require('../controllers/site.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { isFakeAuthenticated} = require('../middlewares/isFakeAuthenticated')

const router = express.Router()

router.put('/', [isAuthenticated], siteController.createCurrentUserSite)
router.put('/create', [isAuthenticated], siteController.createCurrentUserSite)
router.get('/', siteController.getCurrentUserSite)
router.get('/all', siteController.getAllUsersSite)
router.put('/nearest', siteController.getNearestSites)
router.put('/:site', [isAuthenticated], siteController.updateSiteById)

//TODO Mixing API Endpoints for sites
/*
router.patch('/:site', [isAuthenticated], siteController.updateSiteById)
router.get('/:siteId', [isAuthenticated], siteController.getSiteById)
router.delete(':siteId', [isAuthenticated], siteController.deleteSite)*/

module.exports = router
