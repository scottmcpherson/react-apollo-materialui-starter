import React from 'react'
import { Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import thunk from 'redux-thunk'
import routes from './routes'
import theme from './theme'
import reducers from './redux'
import history from './history'
import ScrollToTop from './components/ScrollToTop'
import AuthWrapper from './components/AuthWrapper'

const GRAPHQL_URI = 'http://localhost:3001/graphql'

const httpLink = createHttpLink({
  uri: GRAPHQL_URI
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token')
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTUxOTQ5NDY5M30.ePS3xZ-3HL2kfZMva_BQUuXjRxOKJ4AwVfBFF9IwJLE'

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const store = createStore(reducers, applyMiddleware(thunk))

const Routes = props => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <ApolloProvider client={client}>
              <AuthWrapper history={history} client={client}>
                {routes.map((route, index) => {
                  const { layout: Layout } = route
                  return (
                    <Layout
                      key={index}
                      client={client}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                    />
                  )
                })}
              </AuthWrapper>
            </ApolloProvider>
          </MuiThemeProvider>
        </Provider>
      </ScrollToTop>
    </Router>
  )
}

export default Routes
