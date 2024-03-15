// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample hardcoded user data
let users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' }
];

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create a new user
app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    const id = users.length + 1;
    const newUser = { id, username, password };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { username, password } = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    // console.log(userIndex);
    if (userIndex !== -1) {
        users[userIndex] = { id, username, password };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
