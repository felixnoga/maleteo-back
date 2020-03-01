const debug = require('debug')('Maleteo-Back-APICRUD:fileupload')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    debug('file: ', Date.now() + path.extname(file.originalname))
    cb(null, Date.now() + path.extname(file.originalname))
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'))
  }
})

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    debug('file type is ', file.mimetype)
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
      debug('Middleware upload can not validate filetype')
      cb(new Error('Invalid file type'))
    } else {
      debug('Middleware uploaded picture to public server folder ok')
      cb(null, true)
    }
  }
})

module.exports = { fileUpload: upload }
