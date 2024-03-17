const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const errorHandler = require('./errorHandler');
const { pool } = require('./db');
const indexRouter = require('./routes');
const pollsRouter = require('./routes/polls');
const usersRouter = require('./routes/users');

const { NODE_ENV, SESSION_SECRET } = process.env;

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(
  session({
    store: new pgSession({ pool }),
    secret: SESSION_SECRET,
    resave: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: NODE_ENV === 'production',
    },
    saveUninitialized: false,
  }),
);

app.use('/', indexRouter);
app.use('/api/polls', pollsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
