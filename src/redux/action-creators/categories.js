//商品分类的action
import {reqGetCategories, reqAddCategory, reqRemoveCategory, reqUpdateCategory} from '../../api'
import { GET_CATEGORIES,ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY } from '../action-types/categories'

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

//添加分类
const addCategory = (categoryName) => {
  return {
    type: ADD_CATEGORY,
    data: categoryName
  }
}

export const addCategoryAsync = (categoryName) => {
  return dispatch => {
    return reqAddCategory(categoryName)
      .then(res => {
        const action = addCategory(res)
        dispatch(action)
      })
  }
}

//删除分类
const removeCategory = (categoryId) => {
  return {
    type: REMOVE_CATEGORY,
    data: categoryId
  }
}

export const removeCategoryAsync = (categoryId) => {
  return dispatch => {
    return reqRemoveCategory(categoryId)
      .then(res => {
        dispatch(removeCategory(res))
      })
  }
}

//修改分类

const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  data: category
})


export const updateCategoryAsync = (categoryId,categoryName) => {
  return dispatch => {
    return reqUpdateCategory(categoryId,categoryName)
            .then(res => dispatch(updateCategory(res)))
  }
}


