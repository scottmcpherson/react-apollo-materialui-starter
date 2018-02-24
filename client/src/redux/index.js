import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import user from './reducers/user'
import auth from './reducers/auth'

export default combineReducers({
  user,
  auth,
  form: formReducer
})
