import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItemText, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar
})

class SideBarLinks extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/sports/football">
            <ListItemText primary="Football" />
          </ListItem>
          <ListItem button component={Link} to="/sports/basketball">
            <ListItemText primary="Basketball" />
          </ListItem>
          <ListItem button component={Link} to="/sports/baseball">
            <ListItemText primary="Baseball" />
          </ListItem>
        </List>
      </div>
    )
  }
}

SideBarLinks.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SideBarLinks)
