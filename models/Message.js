const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: { type: String, required: true },
    status: {
      type: String,
      enum: ['Leido', 'Pendiente'],
      default: 'Pendiente'
    }
  },
  {
    timestamps: true
  }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
