const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema(
  {
    name: { type: String, required: false },
    surname: { type: String, required: false },
    profile_img: {
      type: String,
      default:
        'https://res.cloudinary.com/agorostidi/image/upload/v1583055166/avatar-sample_hqanvo.jpg'
    },
    subject: { type: String, required: true },
    details: { type: String, required: false },
    review_type: {
      type: String,
      enum: ['user', 'site', 'booking', 'blog', 'experience','other'],
      default: 'user'
    },
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

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
