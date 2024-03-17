const bcrypt = require('bcrypt');
const express = require('express');
const { insertUser } = require('../db');

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!password) {
    const error = new Error('Missing password');
    error.name = 'ValidationError';
    throw error;
  }

  if (password.length < 8) {
    const error = new Error('Password must be at least 8 characters');
    error.name = 'ValidationError';
    throw error;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await insertUser(username, passwordHash);

  res.json({ userID: user.id });
});

module.exports = usersRouter;
