const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controller')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

// View messages to and from authenticated user
router.get('/', isAuthenticated, chatController.getConversations)

// Retrieve single conversation
router.get('/:conversationId', isAuthenticated, chatController.getConversation)

// Send reply in conversation
router.post('/:conversationId', isAuthenticated, chatController.sendReply)

// Start new conversation
router.post('/new/:recipient', isAuthenticated, chatController.newConversation)

module.exports = router
