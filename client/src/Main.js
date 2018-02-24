import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'
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
import { fetchUser } from './redux/actions/user'
import ScrollToTop from './components/ScrollToTop'
// import './App.css'
// import MainLayout from './layouts/MainLayout'
// import LoginLayout from './layouts/LoginLayout'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : null
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const store = createStore(reducers, applyMiddleware(thunk))
const Fragment = React.Fragment
const Routes = () => {
  const logout = (nextState, replace, cb) => {
    if (client) {
      client.resetStore()
    }
    replace('/')
    cb()
  }

  if (store) {
    let token = localStorage.getItem('token')
    if (token !== null) {
      store.dispatch(fetchUser())
    }
  }
  return (
    <Router>
      <ScrollToTop>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <ApolloProvider client={client}>
              <Fragment>
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
              </Fragment>
            </ApolloProvider>
          </MuiThemeProvider>
        </Provider>
      </ScrollToTop>
    </Router>
  )
}

export default Routes
