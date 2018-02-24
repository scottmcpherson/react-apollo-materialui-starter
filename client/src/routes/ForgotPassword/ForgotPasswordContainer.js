import React, { Component } from 'react'
import ForgotPassword from './ForgotPassword'
import { forgotPassword } from '../../redux/actions/auth'
import { connect } from 'react-redux'

class ForgotPasswordContainer extends Component {
  handleSubmit = async values => {
    try {
      const res = await this.props.dispatch(forgotPassword(values))
      // if (res) this.props.history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return <ForgotPassword onSubmit={this.handleSubmit} />
  }
}
export default connect()(ForgotPasswordContainer)
