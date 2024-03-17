const bcrypt = require('bcrypt');
const express = require('express');
const { getUser } = require('../db');

const indexRouter = express.Router();

indexRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(204).end();
});

indexRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  const credentialsAreCorrect =
    user !== null && (await bcrypt.compare(password, user.password));

  if (!credentialsAreCorrect) {
    const error = new Error('Incorrect username or password');
    error.name = 'AuthenticationError';
    throw error;
  }

  req.session.userID = user.id;

  res.json({ userID: user.id });
});

module.exports = indexRouter;
