import {createTheme} from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'green'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'black !important'
        }
      }
    }
  }
});

export default theme;
