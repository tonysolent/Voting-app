import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#efefef',
    },
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    secondary: {
      main: '#d36461',
    },
  },
});

export default theme;
