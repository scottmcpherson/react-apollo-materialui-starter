import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED
} from '../actionTypes'

import { getRequest } from '../../utils/request'
const API_ENDPOINT = 'http://localhost:3001'

export const fetchUser = data => {
  return dispatch => {
    dispatch({ type: FETCH_USER })
    return getRequest(`${API_ENDPOINT}/user`, data)
      .then(user => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          user
        })
      })
      .catch(err => console.log(err))
  }
}

export const fetchUserSuccess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    user
  }
}
