import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect, useState } from 'react';
import MainTitle from './components/MainTitle';
import NavBar from './components/NavBar';
import Poll from './components/Poll';
import PollsList from './components/PollsList';

const App = () => {
  const [polls, setPolls] = useState([]);
  const [visiblePoll, setVisiblePoll] = useState(null);
  const [userID, setUserID] = useState(null);

  const addPoll = (newPoll) => {
    setPolls(polls.concat(newPoll));
  };

  const deletePoll = async (poll) => {
    await fetch(`/api/polls/${poll.id}`, { method: 'DELETE' });
    setPolls(polls.filter((p) => p.id !== poll.id));
    setVisiblePoll(null);
  };

  const fetchPolls = async () => {
    const res = await fetch('/api/polls');
    const json = await res.json();
    setPolls(json.polls);
    setUserID(json.userID);
  };

  const updatePoll = async (id, option) => {
    const res = await fetch(`/api/polls/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(option),
    });
    const { pollID, option: returnedOption } = await res.json();
    const oldPoll = polls.find((poll) => poll.id === pollID);
    const optionIndex = oldPoll.options.findIndex(
      (opt) => opt.id === returnedOption.id,
    );
    const updatedPollOptions =
      optionIndex === -1
        ? oldPoll.options.concat(returnedOption) // add new poll option
        : oldPoll.options // replace poll option with updated vote count
            .slice(0, optionIndex)
            .concat(returnedOption)
            .concat(oldPoll.options.slice(optionIndex + 1));
    const updatedPoll = {
      ...oldPoll,
      options: updatedPollOptions,
    };
    setPolls(polls.map((poll) => (poll.id !== pollID ? poll : updatedPoll)));
    setVisiblePoll(updatedPoll);
  };

  const showPoll = (poll) => {
    setVisiblePoll(poll);
  };

  const showPollsList = () => {
    setVisiblePoll(null);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar
        addPoll={addPoll}
        setUserID={setUserID}
        showPollsList={showPollsList}
        userID={userID}
        visiblePoll={visiblePoll}
      />
      {visiblePoll === null ? (
        <>
          <MainTitle />
          <PollsList polls={polls} showPoll={showPoll} userID={userID} />
        </>
      ) : (
        <Poll
          deletePoll={deletePoll}
          poll={visiblePoll}
          updatePoll={updatePoll}
          userID={userID}
        />
      )}
    </>
  );
};

export default App;
