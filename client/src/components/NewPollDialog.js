import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const NewPollDialog = ({ addPoll, userID }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const capitalizeWords = (string) =>
    string
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleFieldChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOptionsFieldChange = (event) => {
    setOptions(event.target.value);
  };

  const createNewPoll = async () => {
    try {
      const optionsArray = options
        .split(',')
        .map((opt) => opt.trim())
        .map(capitalizeWords);

      if (optionsArray.length < 2) {
        setErrorMessage(
          'There must be at least 2 comma-separate options (e.g. Pepperoni, Sausage)',
        );
      } else {
        const res = await fetch('/api/polls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: capitalizeWords(title),
            options: optionsArray,
            userID,
          }),
        });
        const newPoll = await res.json();
        addPoll(newPoll);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        New Poll
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Poll</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            onChange={handleTitleFieldChange}
            required
          />
          <TextField
            fullWidth
            label="Options (Comma Separated)"
            onChange={handleOptionsFieldChange}
            required
          />
          <FormHelperText error>{errorMessage}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={createNewPoll}>
            New Poll
          </Button>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewPollDialog;
