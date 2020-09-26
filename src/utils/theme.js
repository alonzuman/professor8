import { createMuiTheme } from '@material-ui/core/styles';

const light = {
  direction: 'rtl',
  palette: {
    secondary: {
      light:'#e53453',
      main:'#e53453',
      dark:'#e53453'
    }
  }
}

const theme = createMuiTheme(light)

export default theme;
