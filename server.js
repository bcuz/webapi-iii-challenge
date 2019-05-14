const express = require('express'); // importing a CommonJS module

const server = express();

server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  next()
};

module.exports = server;
