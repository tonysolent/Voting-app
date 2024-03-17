import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const SignupDialog = ({ setUserID }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordFieldChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleUsernameFieldChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage('');
  };

  const signup = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (res.status === 200) {
        setUserID(json.userID);
        setOpen(false);
      } else {
        setErrorMessage(json.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Username"
            onChange={handleUsernameFieldChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            onChange={handlePasswordFieldChange}
            required
            type="password"
          />
          <FormHelperText error>{errorMessage}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={signup}>
            Sign Up
          </Button>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignupDialog;
