const express = require('express');
const app = express();
const users_router = require('./routes/users');
const tweets_router = require('./routes/tweets');

app.use(express.json());

app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
});

app.use('/users', users_router);
app.use('/tweets', tweets_router);

app.listen(3001);
