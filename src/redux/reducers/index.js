
import {combineReducers} from 'redux'

import user from './user'
import categories from './categories'
import roles from './role'
import lang from './lang'

export default combineReducers({
  user,
  categories,
  roles,
  lang
})
