const debug = require('debug')('Maleteo-Back-APICRUD:db')
const mongoose = require('mongoose')

const DB_URI = process.env.DB_LOCAL || 'mongodb://localhost:27017/maleteo'

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => debug(`Connected to DB ${DB_URI}`))
  .catch(() => debug(`Could not connect to DB ${DB_URI}`))
