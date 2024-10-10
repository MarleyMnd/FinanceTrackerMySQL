const db = require('../models')
const Subscriptions = db.Subscriptions
const Users = db.Users

exports.findAll = (req, res) => {
    Subscriptions.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured'
            })
        })
}

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'The name is mandatory'
        })
        return;
    }
    Subscriptions.create(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not insert the data'
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Subscriptions.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured'
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    Subscriptions.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'task updated'
                })
            } else {
                res.send({
                    message: 'task not found'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured'
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Subscriptions.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'task deleted'
                })
            } else {
                res.send({
                    message: 'task not found'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occured'
            })
        })
}

exports.addSubscription = async (req, res) => {
    const { userId, subscription } = req.body;

    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Subscription:', subscription.nextPayment);

        const newSubscription = await Subscriptions.create({
            name: subscription.name,
            price: subscription.price,
            nextPayment: subscription.nextPayment,
            planType: subscription.planType,
            ID_user: user.id
        });

        res.json({ subscription: newSubscription });
    } catch (error) {
        console.error('Error adding subscription:', error);
        res.status(500).json({ message: 'Failed to add subscription' });
    }
};

// Function to fetch all subscriptions for a user
exports.getSubscriptions = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const subscriptions = await Subscriptions.findAll({ where: { ID_user: user.id } });
        res.json({ subscriptions });
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Failed to fetch subscriptions' });
    }
};

// Function to remove a subscription
exports.removeSubscription = async (req, res) => {
    const { userId, subscriptionId } = req.body;

    try {
        const user = await Users.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await Subscriptions.destroy({ where: { id: subscriptionId, ID_user: user.id } });

        if (result) {
            res.json({ success: true, message: 'Subscription removed successfully' });
        } else {
            res.json({ success: false, message: 'Failed to remove subscription' });
        }
    } catch (error) {
        console.error('Error removing subscription:', error);
        res.status(500).json({ message: 'Failed to remove subscription' });
    }
};