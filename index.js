require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');

const server = express();

server.use(express.json());
server.use(cors())

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.get('/', (req, res) => {
    res.send("Welcome to Cookpedia Server");
});
