const Article = require('../models/Blog')
const debug = require('debug')('Maleteo-Back-APICRUD:blog.controller')

const createArticle = async (req, res, next) => {
  // return (res.status(200).json(req.body))
  const newArticle = new Article(req.body)
  try {
    await newArticle.save()
    res.status(200).json('Articulo guardado correctamente')
  } catch (e) {
    return next(e)
  }
}

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find()
      .sort('-createdAt')
      .limit(10)
      .populate({
        path: 'author',
        select: 'name surname email profile_img'
      })
      .populate({
        path: 'review'
      })
    return res.status(200).json(articles)
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  createArticle,
  getAllArticles
}
