import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_OUT,
  FETCH_USER_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED
} from '../actionTypes'

import { browserHistory } from 'react-router'
import { postRequest } from '../../utils/request'

const API_ENDPOINT = 'http://localhost:3001'
export const signInUser = data => {
  return dispatch => {
    return postRequest(`${API_ENDPOINT}/signin`, data)
      .then(user => {
        localStorage.setItem('token', user.token)
        dispatch({
          type: SIGN_IN_SUCCESS,
          user
        })
        return user
      })
      .catch(err => console.log(err))
  }
}

export const signUpUser = data => {
  return dispatch => {
    return postRequest(`${API_ENDPOINT}/signup`, data)
      .then(user => {
        localStorage.setItem('token', user.token)
        dispatch({
          type: SIGN_UP_SUCCESS,
          user
        })
        return user
      })
      .catch(err => console.log(err))
  }
}

export const forgotPassword = email => {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD })
    return postRequest(`${API_ENDPOINT}/forgot-password`, email)
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: FORGOT_PASSWORD_FAILED })
        console.log(err)
      })
  }
}

export function signOutUser() {
  localStorage.removeItem('token')
  return {
    type: SIGN_OUT
  }
}

export function redirectToLoginWithMessage() {
  return (dispatch, getState) => {
    if (getState().routing.locationBeforeTransitions) {
      const currentPath = getState().routing.locationBeforeTransitions.pathname
      // browserHistory.replace({
      //   pathname: '/login',
      //   state: { nextPathname: currentPath }
      // })
    } else {
      // browserHistory.push('/login')
    }
  }
}
