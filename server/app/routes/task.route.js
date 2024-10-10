module.exports = app => {
    const Tasks = require('../controllers/task.controller.js')
    const router = require('express').Router()
  
    router.get('/', Tasks.findAll)
    router.post('/', Tasks.create)
    router.get('/:id', Tasks.findOne)
    router.delete('/:id', Tasks.delete)
    router.put('/:id', Tasks.update)

    app.post('/addTask', Tasks.addTask)
    app.post('/removeTask', Tasks.removeTask)
    app.post('/updateTaskStatus', Tasks.updateTaskStatus)
    
    app.use('/api/tasks', router)
  }