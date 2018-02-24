import React, { Component } from 'react'
import Signup from './Signup'
import { SubmissionError } from 'redux-form'
import { signUpUser } from '../../redux/actions/auth'
import { connect } from 'react-redux'

class SignupContainer extends Component {
  handleSubmit = async values => {
    try {
      const user = await this.props.dispatch(signUpUser(values))
      if (user) this.props.history.push('/sports/football')
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return <Signup onSubmit={this.handleSubmit} />
  }
}
export default connect()(SignupContainer)
