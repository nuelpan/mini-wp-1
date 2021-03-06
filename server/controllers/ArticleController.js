const Article = require('../models/article')

class ArticleCtrl {
  static async getAll(req, res, next) {
    let filter = {author: req.decodedId}
    if (req.query.tags) {
      filter['tags'] = req.query.tags
    }
    try {
      let article = await Article
        .find(filter)
        .sort({createdAt:-1})
      res.status(200).json(article)
    } catch (error) {
      next(error)
    }   
  }

  static async getSelf(req, res, next) {
    try {
      let article = await Article
        .find({ owner:req.params.authorID })
        .sort({createdAt:-1})
      res.status(200).json(article)
    } catch (error) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const {title, content, tags, created_at, image} = req.body
      const author = req.decodedId
      let article = await Article.create({
        title, content, tags, created_at, author, image
      })
      res.status(201).json(article)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      let article = await Article.findById(req.params.id)
      if (article) res.status(200).json(article)
      else next({status: 404, message: 'Article is not found!'})      
    } catch (error) {
      next(error)
    }
  }
 
  static async edit(req, res, next) {
    try {
      const {title, content, tags, created_at, image} = req.body
      const author = req.decodedId
      let article = await Article.findByIdAndUpdate(req.params.id, {
        title, content, tags, created_at, author, image
      }, {omitUndefined: true})
      res.status(201).json(article)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      let article = await Article
      .findByIdAndDelete(req.params.id)
      res.status(200).json(article)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ArticleCtrl