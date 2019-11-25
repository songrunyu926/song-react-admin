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
