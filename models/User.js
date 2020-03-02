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
    optIn: { tyoe: Boolean, default: false },
    isKeeper: { type: Boolean, default: false },
    avg_score: { type: Number, default: 0, min: 0, max: 5 },
    role: {
      type: String,
      enum: ['user', 'admin', 'operator'],
      default: 'user'
    },
    review: [{
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
