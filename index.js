// inside index.js
const PORT = 8080; // AWS requires port 8080
const express = require('express');
const server = express();
const { getAllUsersForApi, createUser } = require('./db');

require('dotenv').config();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

const apiRouter = require('./api');
server.use('/api', apiRouter);


server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use('/api', (req, res, next) => {
  console.log("A request was made to /api 2");
  next();
});

server.get('/api', (req, res, next) => {
  console.log("A get request was made to /api 1");
  res.send({ message: "success" });
});

