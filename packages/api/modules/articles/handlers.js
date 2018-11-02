const crypto = require('crypto')
const Boom = require('boom')
const Slugify = require('slugify')
const Article = require('./article.model')

const createArticle = async (req, h) => {
  const author = req.auth.credentials.uid
  const username = req.auth.credentials.username

  let slug = Slugify(`${username}-${req.payload.title}`)
  if (await Article.countDocuments({ $or: [{ slugs: { $elemMatch: { $eq: slug } } }, { slug }] }) > 0) {
    slug += `-${crypto.randomBytes(5).toString('hex')}`
  }

  const newArticle = new Article({
    author,
    slug,
    ...req.payload
  })

  const data = await newArticle.save()

  return h.response({
    data: {
      slug: data.slug
    }
  })
}

const editArticle = async (req, h) => {
  const author = req.auth.credentials.uid
  const username = req.auth.credentials.username

  const articleDb = await Article.findOne({ author, _id: req.payload._id })
  if (!articleDb) {
    throw Boom.badData('general.documentUpdateUnauthorized')
  }

  // Was the title updated? If yes we need to archive the previous slug
  let slug = Slugify(`${username}-${req.payload.title}`)
  const slugs = articleDb.slugs || []
  if (articleDb.slug !== slug) {
    if (!articleDb.slugs.includes(slug) && await Article.countDocuments({ $or: [{ slugs: { $elemMatch: { $eq: slug } } }, { slug }] }) > 0) {
      slug += `-${crypto.randomBytes(5).toString('hex')}`
    }

    if (!articleDb.slugs.includes(articleDb.slug)) {
      slugs.push(articleDb.slug)
    }
  }

  const response = await Article.updateOne(
    { author, _id: req.payload._id },
    {
      slug,
      slugs,
      ...req.payload
    }
  )

  if (response.n === 1) {
    return h.response({
      data: {
        slug
      }
    })
  }

  throw Boom.badData('general.updateFail')
}

module.exports = {
  createArticle,
  editArticle
}
