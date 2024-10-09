const db = require('../models') 
const Tasks = db.Tasks

exports.findAll = (req, res) => {
Tasks.findAll()
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
if(!req.body.name) {
    res.status(400).send({
        message: 'The name is mandatory'
    })
    return;
}
Tasks.create(req.body)
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
Tasks.findByPk(id)
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
Tasks.update(req.body, {
    where: {id: id}
})
.then(num => {
    if (num == 1){
        res.send({
            message: 'task updated'
        })
    }else{
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
Tasks.destroy({
    where: {id: id}
})
.then(num => {
    if (num == 1){
        res.send({
            message: 'task deleted'
        })
    }else{
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
