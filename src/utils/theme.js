import { createMuiTheme } from '@material-ui/core/styles';

const light = {
  direction: 'rtl',
  palette: {
    primary: {
      light: '#8c85ff',
      main: '#6c63ff',
      dark: '#5f57e2'
    },
    secondary: {
      light: '#8c85ff',
      main: '#8c85ff',
      dark: '#8c85ff'
    }
  },
  typography: {
    fontFamily: ['Heebo', 'Arimo', 'sans-serif'],
    h1: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: '2rem',
      fontWeight: 500
    },
    h2: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: '3rem',
      fontWeight: 500
    },
    h3: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h4: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: '1.2rem',
      fontWeight: 500
    },
    h5: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: '1rem',
      fontWeight: 500
    },
    body1: {
      fontFamily: ['Arimo']
    },
    body2: {
      fontFamily: ['Arimo']
    },
    subtitle1: {
      fontFamily: ['Arimo'],
      letterSpacing: .5
    },
    subtitle2: {
      fontFamily: ['Arimo'],
      letterSpacing: .5
    },
  },
  shape: {
    borderRadius: 16
  }
}

const theme = createMuiTheme(light)

export default theme;
