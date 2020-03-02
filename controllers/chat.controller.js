const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const User = require('../models/User')

const getConversations = function(req, res, next) {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      // Set up empty array to hold conversations + most recent message
      const fullConversations = []
      conversations.forEach(function(conversation) {
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'name surname profile_img'
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err })
              return next(err)
            }
            fullConversations.push(message)
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations })
            }
          })
      })
    })
}

module.exports = {
  getConversations
}
