import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_OUT,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED
} from '../actionTypes'

export default function(
  auth = { authenticated: false, token: null, logging: false, errorMsg: '' },
  action
) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, auth, {
        logging: true,
        errorMsg: 'Logging...'
      })
    case SIGN_IN_SUCCESS:
      return Object.assign({}, auth, {
        logging: false,
        token: action.user.token,
        authenticated: true
      })
    case SIGN_IN_FAILED:
      return Object.assign({}, auth, {
        logging: false,
        authenticated: false,
        errorMsg: 'Incorrect username or password.'
      })
    case SIGN_UP:
      return Object.assign({}, auth, {
        errorMsg: 'Signing up...'
      })
    case SIGN_UP_SUCCESS:
      return Object.assign({}, auth, {
        authenticated: true,
        token: action.user.token
      })
    case SIGN_UP_FAILED:
      return Object.assign({}, auth, {
        authenticated: false,
        errorMsg: 'Sign up failed.'
      })
    case FORGOT_PASSWORD:
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, auth, {
        errorMsg: ''
      })
    case FORGOT_PASSWORD_FAILED:
      return Object.assign({}, auth, {
        authenticated: false,
        errorMsg: 'Forgot password failed.'
      })
    case SIGN_OUT:
      return Object.assign({}, auth, {
        authenticated: false,
        token: null
      })
    default:
      return auth
  }
}
