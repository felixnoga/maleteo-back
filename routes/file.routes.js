const express = require('express')

const { uploadToCloudinary } = require('../config/cloudinary')
const { fileUpload } = require('../middlewares/file-upload')

const router = express.Router()

router.post('/upload', [fileUpload.single('picture')], async (req, res, next) => {
  try {
    const imageUrl = await uploadToCloudinary(req.file)
    res.status(200).json({ body: req.body, file: req.file, image: imageUrl })
  } catch (err) {
    next(err)
  }
})

router.post('/upload-multiple', [fileUpload.array('pictures', 3)], async (req, res, next) => {
  try {
    const images = []

    for (const file of req.files) {
      const imageUrl = await uploadToCloudinary(file)
      images.push(imageUrl)
    }

    res.status(200).json({ body: req.body, files: req.files, images })
  } catch (err) {
    next(err)
  }
})

module.exports = router
