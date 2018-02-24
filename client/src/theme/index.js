import { createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'
import green from 'material-ui/colors/green'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
    action: {
      disabled: blue
    }
  }
})

export default theme
