import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  SIGN_OUT
} from '../actionTypes'

export default function(auth = { currentUser: null, loading: false }, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, auth, {
        loading: true
      })
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case FETCH_USER_SUCCESS:
      return Object.assign({}, auth, {
        loading: false,
        currentUser: action.user
      })
    case FETCH_USER_FAILED:
      return Object.assign({}, auth, {
        loading: false
      })
    case SIGN_OUT:
      return {}
    default:
      return auth
  }
}
