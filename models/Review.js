const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema(
  {
   
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: { type: String, required: true },
    stars: {
      type: Number,
      max: 5,
      min: 1
    }
  },
  {
    timestamps: true
  }
)

const Review = mongoose.model('Message', reviewSchema)
module.exports = Review