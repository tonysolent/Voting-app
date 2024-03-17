import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

const useStyles = makeStyles({
  list: {
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: 42,
    maxWidth: 960,
  },
  listItem: {
    textAlign: 'center',
    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
});

const PollsList = ({ polls, showPoll }) => {
  const classes = useStyles();

  return (
    <List className={classes.list} disablePadding>
      {polls.map((poll) => (
        <ListItem
          button
          className={classes.listItem}
          divider
          key={poll.id}
          onClick={() => showPoll(poll)}
        >
          <ListItemText primary={poll.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default PollsList;
