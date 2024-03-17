import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    display: 'block',
  },
  formLabel: {
    fontSize: 20,
  },
  radioGroup: {
    margin: '10px 0',
  },
});

const PollForm = ({ poll, updatePoll }) => {
  const classes = useStyles();
  const [choice, setChoice] = useState('');
  const [otherOption, setOtherOption] = useState('');

  const capitalizeWords = (string) =>
    string
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const handleOtherFieldChange = (event) => {
    setOtherOption(event.target.value);
    setChoice('other');
  };

  const handleRadioChange = (event) => {
    setChoice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id } = poll;

    // If the user votes for an 'other' option, the poll is updated with a newly created option.
    // Otherwise, the vote count of an existing option is increased by 1.
    if (choice === 'other') {
      const newOption = {
        id: null,
        name: capitalizeWords(otherOption),
        votes: 1,
      };
      updatePoll(id, newOption);
    } else {
      const option = poll.options.find((opt) => opt.name === choice);
      const updatedOption = { ...option, votes: option.votes + 1 };
      updatePoll(id, updatedOption);
    }

    setChoice('');
    setOtherOption('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset">
        <FormLabel className={classes.formLabel} component="legend">
          {poll.title}
        </FormLabel>
        <RadioGroup
          aria-label={poll.title}
          className={classes.radioGroup}
          name={poll.title}
          onChange={handleRadioChange}
          value={choice}
        >
          {poll.options.map((option) => (
            <FormControlLabel
              control={<Radio required />}
              key={option.id}
              label={option.name}
              value={option.name}
            />
          ))}
          <FormControlLabel
            control={<Radio />}
            label={
              <TextField
                onChange={handleOtherFieldChange}
                required={choice === 'other'}
                value={otherOption}
              />
            }
            value="other"
          />
        </RadioGroup>
      </FormControl>
      <Button
        color="primary"
        className={classes.button}
        type="submit"
        variant="contained"
      >
        Vote
      </Button>
    </form>
  );
};

export default PollForm;
