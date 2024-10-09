const db = require('../models')
const Expenses = db.Expenses

exports.findAll = (req, res) => {
    Expenses.findAll()
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
    console.log('req.body:', req.body)
    if (!req.body.name) {
        res.status(400).send({
            message: 'The name is mandatory'
        })
        return;
    }
    Expenses.create(req.body)
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
    Expenses.findByPk(id)
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
    Expenses.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'expense updated'
                })
            } else {
                res.send({
                    message: 'expense not found'
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
    Expenses.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'expense deleted'
                })
            } else {
                res.send({
                    message: 'expense not found'
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

exports.addExpense = (req, res) => {
    const newExpense = req.body.expense; // Extract the expense object from the request body
    const userId = req.body.userId; // Extract the user ID from the request body

    console.log('New expense:', newExpense);
    console.log('User ID:', userId);

    // Create the expense in your database, including the user ID
    Expenses.create({
        name: newExpense.name,
        price: newExpense.price,
        datetime: newExpense.datetime,
        ID_user: userId // Include the user ID when creating the expense
    })
    .then(data => {
        res.send(data); // Send the expense object directly
        console.log('Expense added:', data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while adding the expense.'
        });
    });
};
