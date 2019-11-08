// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

const port = 8000;

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({ error: "The users information could not be retrieved." }))
});


server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
        .then((data) => {
            if (data === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.json(data)
            }
        })
        .catch((err) => res.status(500).json({ error: "The user information could not be retrieved." }))
});

server.post('/api/users', (req, res) => {
    const user = req.body;

    if (user.name === undefined || user.bio === undefined) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    db.insert(user)
        .then((data) => res.status(201).json({ ...user, ...data }))
        .catch((err) => res.status(500).json({ error: "There was an error while saving the user to the database" }))
});

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = req.body;
    db.update(userId, user)
        .then((data) => res.json(data))
        .catch((err) => res.json("Error on db"))
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
        .then((data) => res.json("Delete successful"))
        .catch((err) => res.json("Error on db"))
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})