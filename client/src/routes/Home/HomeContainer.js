import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Home from './Home'

class HomeContainer extends Component {
  render() {
    console.log('this.props.data: ', this.props.data)
    return <Home {...this.props} />
  }
}

export default graphql(gql`
  query AllSports {
    sports {
      id
      name
    }
  }
`)(HomeContainer)
