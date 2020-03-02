const mongoose = require('mongoose')

const { Schema } = mongoose

const conversationSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    subject: { type: String, required: true },
    status: {
      type: String,
      enum: ['Activo', 'Cerrado'],
      default: 'Activo'
    },
    type: {
      type: String,
      enum: ['Directo', 'MultiChat'],
      default: 'Directo'
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  },
  {
    timestamps: true
  }
)

const Conversation = mongoose.model('Conversation', conversationSchema)
module.exports = Conversation
