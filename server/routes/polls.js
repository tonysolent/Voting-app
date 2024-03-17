const express = require('express');
const {
  deletePoll,
  getPolls,
  insertPoll,
  insertPollOption,
  updatePollOption,
} = require('../db');

const pollsRouter = express.Router();

pollsRouter.delete('/:id', async (req, res) => {
  const pollID = Number(req.params.id);
  await deletePoll(pollID);
  res.status(204).end();
});

pollsRouter.get('/', async (req, res) => {
  const userID = req.session.userID || null;
  const polls = await getPolls();
  res.json({ polls, userID });
});

pollsRouter.post('/', async (req, res) => {
  const { userID, title, options } = req.body;
  const newPoll = await insertPoll(userID, title, options);
  res.json(newPoll);
});

pollsRouter.patch('/:id', async (req, res) => {
  const { id: optionID, name: optionName, votes } = req.body;
  const pollID = Number(req.params.id);
  const result =
    optionID === null
      ? await insertPollOption(pollID, optionName, votes)
      : await updatePollOption(optionID, votes);
  res.json(result);
});

module.exports = pollsRouter;
