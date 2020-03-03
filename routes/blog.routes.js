const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blog.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

router.post('/', [isAuthenticated], blogController.createArticle)
router.post('/create', [isAuthenticated], blogController.createArticle)
router.get('/', blogController.getAllArticles)
router.get('/all', blogController.getAllArticles)

module.exports = router
