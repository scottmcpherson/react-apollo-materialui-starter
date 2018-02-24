import React, { Component } from 'react'
import ForgotPassword from './ForgotPassword'
import { connect } from 'react-redux'

class ForgotPasswordContainer extends Component {
  render() {
    return <ForgotPassword onSubmit={this.props.onForgotPassword} />
  }
}
export default connect()(ForgotPasswordContainer)
