import {reqLogin} from '../../api/index'
import { GET_USER_SUCCESS } from '../action-types/user'

//同步 返回值就是action对象
//异步  返回值是一个函数 在里面完成异步操作

const getUser = data => {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export const getUserAsync = (username,password) => {
  return dispatch => {
    //因为在login中还要调用then方法 去操作props的history 拿不进来 所以返回一个promise对象
    return reqLogin(username,password)
      .then(response => {
        //得到用户数据
        const action = getUser(response)
        //调用dispatch 更新数据
        dispatch(action)
        //要给login。jsx中的then方法获取
        return response
      })
  }
}
