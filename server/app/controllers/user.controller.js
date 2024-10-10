const db = require('../models')
const bcrypt = require('bcrypt')
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
               message: 'user updated'
           })
       }else{
           res.send({
               message: 'user not found'
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
               message: 'user deleted'
           })
       }else{
           res.send({
               message: 'user not found'
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

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the password matches
        if (!passwordMatch) {
            return res.status(401).send({
                message: 'This username and password combination is invalid'
            });
        }

        user.userExpenses = await db.Expenses.findAll({ where: { ID_user: user.id } })
        user.userTasks = await db.Tasks.findAll({ where: { ID_user: user.id } })

        // If login is successful, send a success response
        res.status(200).send({
            message: 'Login successful',
            id: user.id,
            username: user.username,
            balance: user.balance,
            expenses: user.expenses,
            fullName: user.fullName,
            userExpenses: user.userExpenses,
            userTasks: user.userTasks
        });
    } catch (err) {
        res.status(500).send({
            message: 'An error occurred during login',
            error: err.message || 'Internal server error'
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, fullName } = req.body;

        // Check if the username already exists
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hash the password before saving to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the provided details
        const newUser = await Users.create({
            username,
            password: hashedPassword,
            balance: 0, // Initial balance set to 0
            expenses: 0, // Empty expenses list
            fullName
        });

        res.status(201).json({ message: 'Account created successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while creating the account. Please try again.' });
    }
};