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
    space_img: {
      type: [String],
      default: [
        'https://res.cloudinary.com/agorostidi/image/upload/v1583054497/site-sample-2_ncmdgp.jpg',
        'https://res.cloudinary.com/agorostidi/image/upload/v1583054497/site-sample-5_chxm1g.jpg'
      ],
      required: false
    },
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

siteSchema.index({ location: '2dsphere' })

const Site = mongoose.model('Site', siteSchema)
module.exports = Site
