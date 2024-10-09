module.exports = app => {
    const Tasks = require('../controllers/task.controller.js')
    const router = require('express').Router()
  
    router.get('/', Tasks.findAll)
    router.post('/', Tasks.create)
    router.get('/:id', Tasks.findOne)
    router.delete('/:id', Tasks.delete)
    router.put('/:id', Tasks.update)
    
    app.use('/api/tasks', router)
  }