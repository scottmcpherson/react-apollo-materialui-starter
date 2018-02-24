import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { CircularProgress } from 'material-ui/Progress'
import Sport from './Sport'

class SportContainer extends Component {
  render() {
    const { data } = this.props
    const { loading } = data
    if (loading) {
      return (
        <div
          style={{
            width: '50px',
            margin: '0 auto'
          }}
        >
          <CircularProgress size={50} />
        </div>
      )
    }
    return <Sport {...this.props} />
  }
}

const MatchesForSport = gql`
  query SportMatches($sportName: String!) {
    sportMatches(sportName: $sportName) {
      id
      homeTeam
      awayTeam
      sport {
        id
        name
      }
    }
  }
`

export default graphql(MatchesForSport, {
  options: ({ match }) => {
    const { params: { sportName } } = match
    return { variables: { sportName } }
  }
})(SportContainer)
