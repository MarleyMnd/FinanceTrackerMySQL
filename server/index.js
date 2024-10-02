const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Allow requests from your Vue.js front-end

mongoose.connect('mongodb://localhost:27017/Finance_Tracker');


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    balance: Number,
    expenses: Number
});

const UserModel = mongoose.model('users', UserSchema);

app.post('/login', async (req, res) => {
    const { username, password, fullName, balance,expenses} = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Direct comparison since no encryption is used
        if (password === user.password) {
            res.status(200).json({ message: 'Login successful', fullName: user.fullName , balance: user.balance, expenses: user.expenses});
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Save new user to the database
        const newUser = new UserModel({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});