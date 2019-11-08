// implement your API here
const express = require('express');

const server = express();

const port = 8000;

server.use(express.json());

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})