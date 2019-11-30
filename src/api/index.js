import axiosInstance  from './request'

export const reqLogin = (username,password) => {
  return axiosInstance({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

//查询分类
export const reqGetCategories = () => {
  return axiosInstance({
    method: 'GET',
    url: 'category/get',
  })
}

//添加分类
export const reqAddCategory = categoryName => {
  return axiosInstance({
    method: 'POST',
    url: 'category/add',
    data: {
      categoryName
    }
  })
}

//删除分类
export const reqRemoveCategory = categoryId => {
  return axiosInstance({
    method: 'POST',
    url: 'category/delete',
    data: {
      categoryId
    }
  })
}

//修改分类
export const reqUpdateCategory = (categoryId,categoryName) => {
  return axiosInstance({
    method: 'POST',
    url: 'category/update',
    data: {
      categoryId,
      categoryName
    }
  })
}

//获取商品信息数据
export const reqGetProduct = (pageNum, pageSize) => {
  return axiosInstance({
    method: 'GET',
    url: 'product/list',
    params: {
      pageNum,
      pageSize
    }
  })
}

//添加商品信息
export const reqAddProduct = ({
  name,
  desc,
  categoryId,
  price,
  detail
}) => axiosInstance({
  method: 'POST',
  url: '/product/add',
  data: {
    name,
    desc,
    categoryId,
    price,
    detail
  }
})

//修改商品信息
export const reqUpdateProduct = ({
  productId,
  name,
  desc,
  categoryId,
  price,
  detail
}) => axiosInstance({
  method: 'POST',
  url: '/product/update',
  data: {
    productId,
    name,
    desc,
    categoryId,
    price,
    detail
  }
})

//获取单个商品信息数据
export const reqGetOneProduct = (productId) => axiosInstance({
  method: 'GET',
  url: '/product/get',
  params: {
    productId
  }
})

//改变商品的状态
export const reqChangeProductStatus = (productId, status) => axiosInstance({
  method: 'POST',
  url: 'product/update/status',
  data: {
    productId,
    status
  }
})


//发送搜索请求
export const reqSearchProduct = ({searchType, searchValue, pageNum, pageSize}) => axiosInstance({
  method: 'GET',
  url: 'product/search',
  params: {
    pageSize,
    pageNum,
    [searchType]: searchValue
  }
})

//获取角色信息
export const reqGetRole = () => axiosInstance({
  method: 'GET',
  url: 'role/get'
})

//添加角色信息
export const reqAddRole = name => axiosInstance({
  method: 'POST',
  url: 'role/add',
  data: {
    name
  }
})

//更新角色信息
export const reqUpdateRole = ({roleId, authName, menus}) => axiosInstance({
  method: 'POST',
  url: 'role/update',
  data: {
    roleId,
    menus,
    authName   
  }
})

//删除角色信息
export const reqRemoveRole = (roleId) => axiosInstance({
  method: 'POST',
  url: 'role/delete',
  data: {
    roleId
  }
})


//获取用户信息
export const reqGetUser = () => axiosInstance({
  method: 'GET',
  url: 'user/get'
})

//添加用户信息
export const reqAddUser = ({username, password, phone, email, roleId}) => axiosInstance({
  method: 'POST',
  url: 'user/add',
  data: {
    username,
    password,
    phone,
    email,
    roleId
  }
})

//删除用户信息
export const reqDelUser = (username) => axiosInstance({
  method: 'POST',
  url: 'user/delete',
  data: {
    username
  }
})

//修改用户请求
export const reqUpdateUser = (username, password) => axiosInstance({
  method: 'POST',
  url: 'user/update',
  data: {
    username,
    password
  }
})





