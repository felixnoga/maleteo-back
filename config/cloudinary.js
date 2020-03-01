const debug = require('debug')('Maleteo-Back-APICRUD:cloudinary')
const fs = require('fs')
const cloudinary = require('cloudinary').v2

const uploadToCloudinary = async file => {
  let image = null

  if (file) {
    image = await cloudinary.uploader.upload(file.path)
    debug('Uploaded to cloudinary as ', image)
    await fs.unlinkSync(file.path)

    return image.secure_url
  } else {
    return null
  }
}

module.exports = {
  uploadToCloudinary
}
