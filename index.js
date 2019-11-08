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

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})