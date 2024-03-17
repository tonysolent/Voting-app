import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles({
  container: {
    width: 500,
  },
});

const PollChart = ({ options: pollOptions }) => {
  const classes = useStyles();

  const data = {
    labels: pollOptions.map((option) => option.name),
    datasets: [
      {
        data: pollOptions.map((option) => option.votes),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const legend = { display: false };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: 14,
            fontStyle: 'bold',
            labelString: 'Number of Votes',
          },
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return (
    <div className={classes.container}>
      <Bar data={data} legend={legend} options={chartOptions} />
    </div>
  );
};

export default PollChart;
