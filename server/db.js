const { Pool } = require('pg');

const {
  DATABASE_URL,
  NODE_ENV,
  PG_HOST,
  PG_USERNAME,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
} = process.env;

const poolConfig =
  NODE_ENV === 'dev'
    ? {
        user: PG_USERNAME,
        host: PG_HOST,
        database: PG_DATABASE,
        password: PG_PASSWORD,
        port: PG_PORT,
      }
    : {
        connectionString: DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      };

const pool = new Pool(poolConfig);

const closeConnection = () => {
  pool.end();
};

const deletePoll = async (pollID) => {
  const query = {
    text: 'DELETE FROM polls WHERE id = $1',
    values: [pollID],
  };

  const result = await pool.query(query);

  return result;
};

const getPolls = async () => {
  const query =
    'SELECT poll_id, user_id, title, poll_options.id AS option_id, option_name, votes FROM polls INNER JOIN poll_options ON polls.id = poll_options.poll_id';

  const { rows } = await pool.query(query);

  const polls = [];
  rows.forEach((row) => {
    const {
      poll_id: pollID,
      user_id: userID,
      title,
      option_id: optionID,
      option_name: optionName,
      votes,
    } = row;
    const option = { id: optionID, name: optionName, votes };

    const pollsIndex = polls.findIndex((poll) => poll.id === pollID);
    if (pollsIndex === -1) {
      polls.push({
        id: pollID,
        userID,
        title,
        options: [option],
      });
    } else {
      polls[Number(pollsIndex)].options.push(option);
    }
  });

  return polls;
};

const getUser = async (username) => {
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username],
  };

  const { rows } = await pool.query(query);

  return rows[0] || null;
};

const insertPoll = async (userID, title, options) => {
  const query = {
    text: 'INSERT INTO polls (user_id, title) VALUES ($1, $2) RETURNING id',
    values: [userID, title],
  };

  const { rows } = await pool.query(query);

  const { id: newPollID } = rows[0];

  const newPollOptions = await Promise.all(
    options.map(async (optionName) => {
      const newPollOption = await insertPollOption(newPollID, optionName);
      return newPollOption.option;
    }),
  );

  const newPoll = { id: newPollID, options: newPollOptions, title, userID };

  return newPoll;
};

const insertPollOption = async (pollID, optionName, votes = 0) => {
  const query = {
    text:
      'INSERT INTO poll_options (poll_id, option_name, votes) VALUES ($1, $2, $3) RETURNING id',
    values: [pollID, optionName, votes],
  };

  const { rows } = await pool.query(query);

  return {
    pollID,
    option: { id: rows[0].id, name: optionName, votes },
  };
};

const insertUser = async (username, password) => {
  const query = {
    text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
    values: [username, password],
  };

  const { rows } = await pool.query(query);

  return rows[0];
};

const updatePollOption = async (optionID, votes) => {
  const query = {
    text:
      'UPDATE poll_options SET votes = $1 WHERE id = $2 RETURNING poll_id, option_name',
    values: [votes, optionID],
  };

  const { rows } = await pool.query(query);
  const { poll_id: pollID, option_name: optionName } = rows[0];

  return { pollID, option: { id: optionID, name: optionName, votes } };
};

module.exports = {
  closeConnection,
  deletePoll,
  getPolls,
  getUser,
  insertPoll,
  insertPollOption,
  insertUser,
  pool,
  updatePollOption,
};
