const Handlers = require('./handlers')
const Validate = require('./validate')

const routes = []

routes.push([
  {
    method: 'POST',
    path: '/v1/article',
    handler: (req, h, next) => Handlers.createArticle(req, h, next),
    options: {
      auth: { access: { scope: ['user'] } },
      tags: ['articles'],
      validate: Validate.createArticle
    }
  },
  {
    method: 'PUT',
    path: '/v1/article',
    handler: (req, h, next) => Handlers.editArticle(req, h, next),
    options: {
      auth: { access: { scope: ['user'] } },
      tags: ['articles'],
      validate: Validate.editArticle
    }
  }
])

module.exports = routes
