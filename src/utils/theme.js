import { createMuiTheme } from '@material-ui/core/styles';

const light = {
  direction: 'rtl',
  palette: {
    secondary: {
      light: '#ffffff',
      main: '#f7f7f7',
      dark: '#f2f2f2'
    }
  }
}

const theme = createMuiTheme(light)

export default theme;
