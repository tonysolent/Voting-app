import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import PollChart from './PollChart';
import PollForm from './PollForm';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: 42,
    padding: 42,
  },
  button: {
    marginTop: 21,
    textAlign: 'center',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

const Poll = ({ deletePoll, poll, updatePoll, userID }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
      <div className={classes.flex}>
        <PollForm poll={poll} updatePoll={updatePoll} />
        <PollChart options={poll.options} />
      </div>
      {poll.userID === userID && (
        <div className={classes.button}>
          <Button
            color="secondary"
            onClick={() => deletePoll(poll)}
            variant="contained"
          >
            Delete Poll
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Poll;
