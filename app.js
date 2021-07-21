const express = require('express');
const app = express();
const users_router = require('./routes/users');

app.use('/users', users_router);

app.listen(3000);
