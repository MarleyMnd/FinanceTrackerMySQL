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

exports.addTask = async (req, res) => {
    try {
      const { userId, Task } = req.body;

      console.log('addTask: ', req.body)
  
      // Create a new task instance
      const newTask = await Tasks.create({
        name: Task.name,
        goal_date: Task.goal_date,
        state: Task.state,
        ID_user: userId
      });
  
      // Respond with the created task
      res.status(201).json({
        message: 'Task added successfully',
        task: newTask
      });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ message: 'Error adding task', error: error.message });
    }
  }

  exports.removeTask = async (req, res) => {
    const { taskId } = req.body; // Assuming you send the taskId and userId in the request body

    console.log('id task: ',taskId)

    try {
        // Remove the task from the database
        const deletedTask = await Tasks.destroy({
            where: {
                id: taskId
            }
        });

        if (deletedTask) {
            res.status(200).json({
                message: 'Task removed successfully',
            });
        } else {
            res.status(404).json({
                message: 'Task not found',
            });
        }
    } catch (error) {
        console.error('Error removing task:', error);
        res.status(500).json({ message: 'Error removing task', error: error.message });
    }
}

exports.updateTaskStatus = (req, res) => {
    console.log('updateTaskStatus: ', req.body)
}