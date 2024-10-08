const db = require('../models') 
const Users = db.Users

exports.findAll = (req, res) => {
   Users.findAll()
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
   Users.create(req.body)
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
   Users.findByPk(id)
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
   Users.update(req.body, {
       where: {id: id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: 'product updated'
           })
       }else{
           res.send({
               message: 'Product not found'
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
   Users.destroy({
       where: {id: id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: 'Product deleted'
           })
       }else{
           res.send({
               message: 'Product not found'
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

exports.login = async (req, res) => {
    
    console.log(req.body)
    const { username, password } = req.body;

    try {
        // Await the findOne call to get the user
        const user = await Users.findOne({ where: { username: username } });

        // Check if the user exists
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).send({
                message: 'This username and password combination is invalid'
            });
        }

        // If login is successful, send a success response
        res.status(200).send({
            message: 'Login successful',
            user: {
                username: user.username,
                balance: user.balance,
                expenses: user.expenses,
                fullName: user.fullName
            }
        });
    } catch (err) {
        res.status(500).send({
            message: 'An error occurred during login',
            error: err.message || 'Internal server error'
        });
    }
};
