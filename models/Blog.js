const mongoose = require('mongoose')

const { Schema } = mongoose

const blogSchema = new Schema(
  {
    publishedDate: { type: Date, required: false },
    status: {
      type: String,
      enum: ['Publicado', 'Borrador', 'Pendiente'],
      default: 'Borrador',
      required: true
    },
    articleType: {
      type: String,
      enum: ['Novedad', 'Experiencia', 'Blog', 'Otros'],
      default: 'Novedad'
    },
    tags: [(type: String)],
    title: { type: String, required: true },
    brief: { type: String, required: false },
    body: { type: String, required: true },
    picture_url: {
      type: String,
      default:
        'https://res.cloudinary.com/agorostidi/image/upload/v1583054497/experiencias-sample_tbehzj.jpg',
      required: false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
