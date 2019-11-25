import {GET_CATEGORIES,ADD_CATEGORY} from '../action-types/categories'

function categories(prevState = [], action){
  switch(action.type){
    case GET_CATEGORIES:
      return action.data 
    case ADD_CATEGORY:
      return prevState.push(action.data)
    default:
      return prevState
  }
}

export default categories
