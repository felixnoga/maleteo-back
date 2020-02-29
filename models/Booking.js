const mongoose = require('mongoose')

const { Schema } = mongoose

const bookingSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    keeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    firstDayPrice: { type: Number, default: 6, required: true },
    extraDayPrice: { type: Number, default: 4, required: true },
    suitcasesPieces: { type: Number, default: 1, min: 1, max: 20, required: true },
    status: {
      type: String,
      enum: ['Aceptada', 'Pendiente', 'Rechazada', 'Cancelada', 'Finalizada'],
      default: 'Pendiente'
    }
  },
  {
    timestamps: true
  }
)

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking
