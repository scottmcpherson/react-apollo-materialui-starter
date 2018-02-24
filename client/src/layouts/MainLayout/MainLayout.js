import React from 'react'
import PropTypes from 'prop-types'
import TopAppBar from '../../components/TopAppBar'
import SideBarLinks from '../../components/SideBarLinks'
import { Route } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Hidden from 'material-ui/Hidden'
import Paper from 'material-ui/Paper'

const drawerWidth = 160
const betSlipDrawerWidth = 240

const styles = theme => {
  return {
    root: {
      width: '100%',
      zIndex: 1,
      overflow: 'hidden'
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
      width: 250,
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        position: 'relative',
        height: '100%',
        borderRight: 0,
        background: '#eee'
      }
    },
    wagerDrawer: {
      width: betSlipDrawerWidth,
      [theme.breakpoints.up('md')]: {
        width: betSlipDrawerWidth,
        position: 'fixed',
        height: '100%',
        right: 0,
        top: '70px',
        borderRight: 0,
        borderLeft: 0,
        background: '#eee',
        padding: theme.spacing.unit * 2
      }
    },
    content: {
      width: '100%',
      marginTop: '64px',
      padding: theme.spacing.unit * 3,
      [theme.breakpoints.up('md')]: {
        marginRight: betSlipDrawerWidth + theme.spacing.unit * 2
      }
    },
    betSlipAppBar: {
      height: '40px',
      boxShadow: 'none',
      padding: theme.spacing.unit,
      fontSize: '10px'
    }
  }
}

class MainLayout extends React.Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  render() {
    const { classes, theme, client, component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={matchProps => (
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <TopAppBar
                client={client}
                handleDrawerToggle={this.handleDrawerToggle}
              />
              <Hidden mdUp>
                <Drawer
                  type="temporary"
                  anchor={'left'}
                  open={this.state.mobileOpen}
                  classes={{
                    paper: classes.drawerPaper
                  }}
                  onClose={this.handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                >
                  <SideBarLinks />
                </Drawer>
              </Hidden>
              <Hidden smDown implementation="css">
                <Drawer
                  type="permanent"
                  open
                  classes={{
                    paper: classes.drawerPaper
                  }}
                >
                  <SideBarLinks />
                </Drawer>
              </Hidden>

              <main className={classes.content}>
                <Component {...matchProps} />
              </main>
            </div>
          </div>
        )}
      />
    )
  }
}
MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(MainLayout)
