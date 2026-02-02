require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');
const router = require('./routes/routing');

const server = express();

server.use(cors()); // to allow cross origin requests
server.use(express.json()); // for the server to understand the data shared in json format call the json middleware
server.use(router);
server.use('/uploads', express.static('./uploads'))

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.get('/', (req, res) => {
    res.status(200).send("Welcome to Cookpedia Server");
});
