const express = require('express')

const siteController = require('../controllers/site.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

router.put('/', [isAuthenticated], siteController.createCurrentUserSite)
router.get('/', [isAuthenticated], siteController.getCurrentUserSite)
router.get('/All', [isAuthenticated], siteController.getAllUsersSite)
router.patch('/:site', [isAuthenticated], siteController.updateSiteById)

/*



router.patch('/:site', [isAuthenticated], siteController.updateSiteById)
router.get('/:siteId', [isAuthenticated], siteController.getSiteById)
router.delete(':siteId', [isAuthenticated], siteController.deleteSite)*/

module.exports = router
