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
      light:'#e53453',
      main:'#e53453',
      dark:'#e53453'
    }
  },
  typography: {
    fontFamily: ['Heebo', 'Arimo', 'sans-serif'],
    h1: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: 32,
      fontWeight: 500
    },
    h3: {
      fontFamily: ['Heebo', 'Arimo'],
      fontSize: 24,
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
