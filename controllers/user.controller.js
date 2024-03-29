const User = require('../models/User')
const debug = require('debug')('Maleteo-Back-APICRUD:user.controller')

const getCurrentUser = async (req, res, next) => {
  try {
    const UserId = req.UserId
    debug('In getCurrentUser buscando por ' + UserId)
    const doc = await User.findOne(UserId).populate('review')
    return res.status(200).json(doc)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const getAllUsers = async (req, res, next) => {

  const role = req.UserRole
  if (role !== 'admin') return res.status(400).json('API Restricted to admin users')

  try {
    debug('buscando Todos los usuarios')
    const Users = await User.find().populate('review')
    debug(Users)

    return res.status(200).json(Users)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const getUserById = async (req, res, next) => {
  const { userId } = req.params

  try {
    debug('buscando por ' + userId)
    const user = await User.findById(userId).populate('review')

    if (user) {
      return res.status(200).json(user)
    }
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const updateCurrentUser = async (req, res, next) => {
  const UserId = req.UserId
  const newData = JSON.stringify(req.body)

  debug('Me dispongo a modificar ' + UserId + ' con ' + newData)

  const olddoc = await User.findByIdAndUpdate(UserId, req.body, { upsert: true })
  debug('Updated ', olddoc)
  const newdoc = await User.findOne(UserId).populate('review')

  //TODO: Actualizar el usuario en todos los reviews existentes

  return res.status(200).json(newdoc)
}

const deleteUser = (req, res, next) => {
  res.status(200).json('Are you sure you want to be deleted ? Why ?')
}

module.exports = {
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateCurrentUser,
  deleteUser
}
