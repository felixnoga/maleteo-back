const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    ChatMessage: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
