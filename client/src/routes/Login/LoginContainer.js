import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'

class LoginContainer extends Component {
  render() {
    return <Login onSubmit={this.props.onLogin} />
  }
}
export default connect()(LoginContainer)
