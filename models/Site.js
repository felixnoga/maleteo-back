const mongoose = require('mongoose')

const { Schema } = mongoose

const siteSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    property: {
      type: String,
      enum: ['Casa', 'Hotel', 'Establecimiento'],
      default: 'Casa'
    },
    type: {
      type: String,
      enum: ['Habitacion', 'Hall', 'Trastero', 'Buhardilla', 'Garaje'],
      default: 'Habitacion'
    },
    space_img: { type: [String], required: false },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    region: {
      type: String,
      enum: ['Europa', 'Asia', 'Africa', 'LatinoAmerica', 'America'],
      default: 'Europa'
    },
    zip: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number],
        required: false
      }
    }
  },
  {
    timestamps: true
  }
)

const Site = mongoose.model('Site', siteSchema)
module.exports = Site
