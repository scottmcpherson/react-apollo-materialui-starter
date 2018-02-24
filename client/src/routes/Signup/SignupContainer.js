import React, { Component } from 'react'
import Signup from './Signup'
import { connect } from 'react-redux'

class SignupContainer extends Component {
  render() {
    return <Signup onSubmit={this.props.onSignUp} />
  }
}
export default connect()(SignupContainer)
