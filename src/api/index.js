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


//获取用户信息
export const reqGetUser = () => axiosInstance({
  method: 'GET',
  url: 'user/get'
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

