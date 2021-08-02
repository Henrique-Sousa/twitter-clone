const express = require('express');
const app = express();
const users_router = require('./routes/users');
const tweets_router = require('./routes/tweets');
const createError = require('http-errors');

app.use(express.json());

app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
});

app.use('/users', users_router);
app.use('/tweets', tweets_router);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
	error = req.app.get('env') === 'development' ? err : "nao ha erro";
	res.status(error.status || 500);
	res.end();
});

app.listen(3001);
