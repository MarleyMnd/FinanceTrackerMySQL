module.exports = app => {
    const Expenses = require('../controllers/expense.controller.js')
    const router = require('express').Router()
  
    router.get('/', Expenses.findAll)
    router.post('/', Expenses.create)
    router.get('/:id', Expenses.findOne)
    router.delete('/:id', Expenses.delete)
    router.put('/:id', Expenses.update)
    app.use('/addExpense', Expenses.addExpense)
    app.use('/removeLastExpense', Expenses.removeLastExpense)

    app.use('/api/expenses', router)
  }