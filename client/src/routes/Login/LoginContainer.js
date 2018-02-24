import React, { Component } from 'react'
import Login from './Login'
import { signInUser } from '../../redux/actions/auth'
import { connect } from 'react-redux'

class LoginContainer extends Component {
  handleSubmit = async values => {
    try {
      const user = await this.props.dispatch(signInUser(values))
      if (user) this.props.history.push('/sports/football')
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return <Login onSubmit={this.handleSubmit} />
  }
}
export default connect()(LoginContainer)
