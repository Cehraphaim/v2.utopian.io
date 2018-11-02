const Joi = require('joi')

const createArticle = {
  payload: {
    body: Joi.string().trim().required(),
    title: Joi.string().trim().required()
  }
}

const editArticle = {
  payload: {
    _id: Joi.string().trim().required(),
    body: Joi.string().trim().required(),
    title: Joi.string().trim().required()
  }
}

module.exports = {
  createArticle,
  editArticle
}
