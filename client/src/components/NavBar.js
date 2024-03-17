import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import LoginDialog from './LoginDialog';
import NewPollDialog from './NewPollDialog';
import SignUpDialog from './SignupDialog';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
  },
  flex: {
    flex: 1,
  },
}));

const NavBar = ({ addPoll, showPollsList, setUserID, userID, visiblePoll }) => {
  const classes = useStyles();

  const logout = async () => {
    try {
      await fetch('/logout');
      setUserID(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        {visiblePoll === null ? (
          <Typography className={classes.flex} variant="h6">
            Voting App
          </Typography>
        ) : (
          <>
            <IconButton
              aria-label="back"
              color="inherit"
              onClick={showPollsList}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">{visiblePoll.title}</Typography>
            <div className={classes.flex}></div>
          </>
        )}
        {userID === null ? (
          <>
            <LoginDialog setUserID={setUserID} />
            <SignUpDialog setUserID={setUserID} />
          </>
        ) : (
          <>
            <NewPollDialog addPoll={addPoll} userID={userID} />
            <Button color="inherit" onClick={logout}>
              Log Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
