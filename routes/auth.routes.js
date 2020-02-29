const express = require('express')

const authController = require('../controllers/auth.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/is-logged', [isAuthenticated], authController.isLoggedIn)


router.post('/register', authController.register)
router.post('/login', authController.login) 
router.get('/who',[isAuthenticated], authController.whoAmI)


module.exports = router
