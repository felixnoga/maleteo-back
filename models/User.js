const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    profile_img: {
      type: String,
      required: false
    },
    birthdate: { type: Date, required: false },
    lastlogin: { type: Date, default: Date.now },
    optIn: { tyoe: Boolean, default: false },
    isKeeper: { type: Boolean, default: false },
    avg_score: { type: Number, default: 0, min: 0, max: 5 },
    role: {
      type: String,
      enum: ['user', 'admin', 'operator'],
      default: 'user'
    },
    welcome_tour_done:  { type: Boolean, default: false },
    confirmation_code: String,
    email_confirmed: { type: Boolean, default: false },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
