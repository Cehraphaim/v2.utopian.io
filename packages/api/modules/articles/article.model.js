const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const articles = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Users' },
  body: { type: String, required: true, index: { unique: true }, text: true },
  slug: { type: String, required: true, index: true },
  slugs: { type: Array, index: true },
  title: { type: String, required: true, index: { unique: true }, text: true },
  views: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
})

module.exports = Mongoose.model('Article', articles, 'articles')
