const express = require('express')

const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()


router.get('/All', [isAuthenticated], userController.getAllUsers) 
router.get('/', [isAuthenticated], userController.getCurrentUser)
router.patch('/', [isAuthenticated], userController.updateCurrentUser)
router.get('/:userId', [isAuthenticated], userController.getUserById)
//router.put('/:userId', [isAuthenticated], userController.updateUser)
router.delete(':userId', [isAuthenticated], userController.deleteUser)

module.exports = router
