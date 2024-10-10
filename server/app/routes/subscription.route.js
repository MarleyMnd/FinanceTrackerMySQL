module.exports = app => {
    const Subscriptions = require('../controllers/subscription.controller.js')
    const router = require('express').Router()
  
    router.get('/', Subscriptions.findAll)
    router.post('/', Subscriptions.create)
    router.get('/:id', Subscriptions.findOne)
    router.delete('/:id', Subscriptions.delete)
    router.put('/:id', Subscriptions.update)

    // Route to add a new subscription
    app.post('/addSubscription', Subscriptions.addSubscription);

    // Route to fetch all subscriptions for a user
    app.post('/getSubscriptions', Subscriptions.getSubscriptions);

    // Route to remove a subscription
    app.post('/removeSubscription', Subscriptions.removeSubscription);

    app.use('/api/subscriptions', router)
  }