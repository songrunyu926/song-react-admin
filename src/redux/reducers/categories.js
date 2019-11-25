import {GET_CATEGORIES,ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY} from '../action-types/categories'

function categories(prevState = [], action){
  switch(action.type){
    case UPDATE_CATEGORY:
      return prevState.map(category => {
        if(action.data._id === category._id){
           return action.data 
        }
        return category
      })
    case REMOVE_CATEGORY:
      return prevState.filter(category => category._id !== action.data)
    case GET_CATEGORIES:
      return action.data 
    case ADD_CATEGORY:
      return [...prevState, action.data]  //不能修改原数据
    default:
      return prevState
  }
}

export default categories
