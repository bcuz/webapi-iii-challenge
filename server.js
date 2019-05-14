const express = require('express'); // importing a CommonJS module

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(logger)

server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  next()
};

module.exports = server;
