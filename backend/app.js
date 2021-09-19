const express = require('express');
const createError = require('http-errors');
const usersRouter = require('./src/routes/users');
const tweetsRouter = require('./src/routes/tweets');

const app = express();

app.use(express.json());

app.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  const error = req.app.get('env') === 'development' ? err : '';
  res.status(error.status || 500);
  res.end();
});

app.listen(3000);
