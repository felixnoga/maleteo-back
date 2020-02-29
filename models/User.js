const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    profile_img: { type: String, required: false },
    birthdate: { type: Date, required: false },
    optIn: { tyoe: Boolean, default:false},
    isKeeper: { type: Boolean, default: false },
    avg_score: { type: Number, default: 0, min: 0, max: 5 },
    role: {
      type: String,
      enum: ['user', 'admin', 'operator'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
)

/*
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})


const spaceSchema = new Schema({
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
    type: pointSchema,
    required: false
  }
})

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    profile_img: { type: String, required: false },
    birthdate: { type: Date, required: false },
    isKeeper: { type: Boolean, default: false },
    spaceData: {
      type: [spaceSchema],
      required: false
    }
  },
  {
    timestamps: true
  }
)
*/

const User = mongoose.model('User', userSchema)
module.exports = User

/*
/ Example User

{
  "email":"andres.gorostidi@es.ibm.com",
  "password":"$2b$12$gO8.Cmv.EOWsCKc17Wy1leN.C6znNdPPQCFxAWGYCgYNTv8C9ptGe",
  "name":"Andres",
  "surname":"Gorostidi",
  "profile_img":"http://miimagen.com/picture_profile.jpg",
  "birthdate":"1971-07-17T14:07:03.382Z",
  "isKeeper":false,
  "spaceData":[
     {
        "name":"El hall de Andres",
        "description":"Un sitio centrico, comodo, a 10 minutos del centro, donde dejar tus cosas",
        "property":"Casa",
        "type":"Habitacion",
        "space_img":"http://miimagen.com/picture_space.jpg",
        "street":"Avenida de Europa 42, Portal 5, 1B",
        "city":"Pozuelo de Alarcon",
        "state":"Madrid",
        "country":"Spain",
        "region":"Europa",
        "zip":"28224",
        "location":{
           "type":"Point",
           "coordinates":[
              40,
              5
           ]
        }
     }
  ]
}

*/
