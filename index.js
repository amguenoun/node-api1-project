// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

const port = 8000;

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then((data) => res.json(data))
        .catch((err) => res.json("Error on db"))
});


server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
        .then((data) => res.json(data))
        .catch((err) => res.json("Error on db"))
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    db.insert(user)
        .then((data) => res.json({ ...user, ...data }))
        .catch((err) => res.json("Error on db"))
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