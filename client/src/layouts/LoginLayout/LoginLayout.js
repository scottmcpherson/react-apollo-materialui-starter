import React, { Component } from 'react'
import TopAppBar from '../../components/TopAppBar'
import { Route } from 'react-router-dom'
const Fragment = React.Fragment

export default class LoginLayout extends Component {
  render() {
    const { client, component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={matchProps => (
          <Fragment>
            <TopAppBar client={client} />
            <Component {...matchProps} {...rest} />
          </Fragment>
        )}
      />
    )
  }
}
