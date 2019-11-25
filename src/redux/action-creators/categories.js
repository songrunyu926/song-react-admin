//商品分类的action
import {reqGetCategories,reqAddCategory} from '../../api'
import { GET_CATEGORIES,ADD_CATEGORY } from '../action-types/categories'

const getCategories = data => {
  return {
    type: GET_CATEGORIES,
    data
  }
}

export const getCategoriesAsync = () => {
  return dispatch => {
    return reqGetCategories()
      .then(res => {
        const action = getCategories(res)
        dispatch(action)
      })
  }
}

const addCategory = (categoryName) => {
  return {
    type: ADD_CATEGORY,
    data: categoryName
  }
}

export const addCategoryAsync = (categoryName) => {
  return dispatch => {
    return reqAddCategory(categoryName)
      .then(req => {
        const action = addCategory(req)
        dispatch(action)
      })
  }
}
