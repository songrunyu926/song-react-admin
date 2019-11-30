import { reqGetRole, reqAddRole, reqUpdateRole, reqRemoveRole } from '../../api'
import { GET_ROLE, ADD_ROLE, UPDATE_ROLE, REMOVE_ROLE } from '../action-types/role'

//获取角色信息的create action方法
const getRole = roles => {
  return {
    type: GET_ROLE,
    data: roles
  }
}

export const getRoleAsync = () => {
  return dispatch => {
    return reqGetRole()
        .then(res => dispatch(getRole(res)))
  }
}

//添加角色信息
const addRole = role => {
  return {
    type: ADD_ROLE,
    data: role
  }
}

export const addRoleAsync = name => {
  return dispatch => {
    return reqAddRole(name)
              .then(res => dispatch(addRole(res)))
  }
}

//跟新角色信息
const updateRole = role => {
  return {
    type: UPDATE_ROLE,
    data: role
  }
}

export const updateRoleAsync = ({roleId, authName, menus}) => {
  return dispatch => {
    return reqUpdateRole({roleId, authName, menus})
              .then(res => dispatch(updateRole(res)))
  }
}

//删除角色
const removeRole = roleId => {
  return {
    type: REMOVE_ROLE,
    data: roleId
  }
}

export const removeRoleAsync = roleId => {
  return dispatch => {
    return reqRemoveRole(roleId)
              .then(res => dispatch(removeRole(res)))
  }
}
