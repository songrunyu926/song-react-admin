import { GET_ROLE, ADD_ROLE, UPDATE_ROLE } from '../action-types/role'

function roles(prevState = [],action){
  switch(action.type){
    case UPDATE_ROLE:
      return prevState.map(role => {
        if(role._id === action.data._id){
          return action.data
        }
        return role
      })
    case ADD_ROLE:
      return [...prevState, action.data]
    case GET_ROLE:
      return action.data
    default:
      return prevState
  }
}

export default roles
