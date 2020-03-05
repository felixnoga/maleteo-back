const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

// Ver mensajes de un usuario autenticado
router.get('/', isAuthenticated, chatController.getConversations)

// Ver detalles de una conversacion especifica
router.get('/:conversationId', isAuthenticated, chatController.getConversation)

// Enviar respuesta a una conversacion
router.post('/:conversationId', isAuthenticated, chatController.sendReply)

// Empezar una nueva conversacion
router.post('/new/:recipient', isAuthenticated, chatController.newConversation)

module.exports = router
