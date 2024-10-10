module.exports = app => {
  const Users = require('../controllers/user.controller.js')
  const router = require('express').Router()

  router.get('/', Users.findAll)
  router.post('/', Users.create)
  router.get('/:id', Users.findOne)
  router.delete('/:id', Users.delete)
  router.put('/:id', Users.update)
  app.post('/login', Users.login)
  app.post('/register', Users.register)

  app.use('/api/users', router)
}