const express = require('express');
const app = express();
const users_router = require('./routes/users');
const tweets_router = require('./routes/tweets');

app.use('/users', users_router);
app.use('/tweets', tweets_router);

app.listen(3000);
