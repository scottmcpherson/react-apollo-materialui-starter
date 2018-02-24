import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui-icons/AccountCircle'
import MenuIcon from 'material-ui-icons/Menu'
import Menu, { MenuItem } from 'material-ui/Menu'
import { signOutUser } from '../../redux/actions/auth'
import { connect } from 'react-redux'

const Fragment = React.Fragment
const SignupSigninButtons = () => (
  <Fragment>
    <Button color="contrast" component={Link} to="/signup">
      Sign Up
    </Button>
    <Button color="contrast" component={Link} to="/login">
      Log In
    </Button>
  </Fragment>
)

class ProfileDropdown extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout = () => {
    this.handleClose()
    const { client, dispatch } = this.props
    client.resetStore()
    dispatch(signOutUser())
  }

  render() {
    const { classes } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="contrast"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem component={Link} to="/login" onClick={this.handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    )
  }
}
const Profile = connect()(ProfileDropdown)

const drawerWidth = 240

const barStyles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      zIndex: 1300
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  flex: {
    flex: 1
  }
})

class ButtonAppBar extends React.Component {
  render() {
    const { classes, theme, currentUser, client } = this.props

    return (
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          {currentUser && (
            <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography type="title" color="inherit" className={classes.flex}>
            Sports
          </Typography>
          {currentUser ? <Profile client={client} /> : <SignupSigninButtons />}
        </Toolbar>
      </AppBar>
    )
  }
}

const connector = connect(state => ({
  currentUser: state.user.currentUser
}))(withStyles(barStyles, { withTheme: true })(ButtonAppBar))

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connector
