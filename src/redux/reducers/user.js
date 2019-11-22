import { GET_USER_SUCCESS, REMOVE_USER_SUCCESS } from '../action-types/user'
import {getItem} from '../../utils/storage'

const initState = getItem('user') || {}

function user(prevState = initState, action) {
  switch(action.type){
    case REMOVE_USER_SUCCESS:
      return {}
    case GET_USER_SUCCESS:
      return action.data
    default: 
      return prevState
  }
}

export default user
