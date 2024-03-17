const errorHandler = (error, req, res, next) => {
  if (error.code && error.code === '23502') {
    // PostgreSQL not-null constraint
    return res.status(400).json({ error: 'Missing username' });
  }

  if (error.code && error.code === '23505') {
    // PostgreSQL unique constraint violation
    return res.status(400).json({ error: 'Username already exists' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === 'AuthenticationError') {
    return res.status(401).json({ error: error.message });
  }

  console.error(error);

  next(error);
};

module.exports = errorHandler;
