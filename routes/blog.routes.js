const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blog.controller')

router.post('/create', blogController.createArticle)
router.get('/all', blogController.getAllArticles)

module.exports = router
