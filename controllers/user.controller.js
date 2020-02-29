const User = require('../models/User')

const getCurrentUser = async (req, res, next) => {
  try {
    const UserId = req.UserId
    console.log('getCurrent User buscando por ' + UserId)
    const doc = await User.findOne(UserId)

    return res.status(200).json(doc)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    console.log('buscando Todos los usuarios')
    const Users = await User.find()
    console.log(Users)

    return res.status(200).json(Users)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const getUserById = async (req, res, next) => {
  const { userId } = req.params

  try {
    console.log('buscando por ' + userId)
    const user = await User.findById(userId)

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

  console.log ("Me dispongo a modificar "+UserId+" con "+newData)

  const olddoc=await User.findByIdAndUpdate(UserId, req.body, { upsert: true })
  console.log ("Updated ",olddoc)
  const newdoc = await User.findOne(UserId)

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
