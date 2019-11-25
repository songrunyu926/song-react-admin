import axios from 'axios'
import codeMessage from '../config/codeMessage'
import {message} from 'antd'
import store from '../redux/store'
import { removeItem } from '../utils/storage'
import { removeUser } from '../redux/action-creators/user'
import history from '../utils/history'

//使用axios.create方法 创建一个axios对象 里面可以配置一些公共配置
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, //发送请求的限制时间
  headers: {
    //公共的请求头
  }
})

//axios请求拦截器  请求拦截器: 在axios发送请求之前触发的拦截器回调函数
axiosInstance.interceptors.request.use(config => {
  // 将要发送请求是成功的（内部没有出错）触发回调函数 
  //功能就是修改请求信息
  //当有token时，自动传入token
  const {
    user: {
      token
    }
  } = store.getState();

  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//axios响应拦截器  响应拦截器: 在浏览器接收响应之前触发的拦截器回调函数
//统一处理失败错误
axiosInstance.interceptors.response.use(({data}) => {
  //响应成功之前 调用的回调
  //可以处理响应数据
  if (data.status === 0) {
    return data.data
  } else {
   message.error(data.msg)
    return Promise.reject(data.msg)
  }
}, error => {

  let errorMessage = ''
  console.dir(error)
  //先通过error.response  有没有响应  
  if (error.response) {
    errorMessage = codeMessage[error.response.status] || '未知错误'
    //在这判断响应状态码是否为401
    console.log(error.response.status)
    if(error.response.status === 401){
      //token有问题 清空数据
      removeItem('user')
      //用不了高阶组件的方法 使用dispatch
      store.dispatch(removeUser())
      //跳转 不能直接使用路由组件属性 去修改配置
      history.replace('/login')
    }
  } else {
    if (error.message.indexOf('Network Error')) {
      errorMessage = '网络断开，请检查连接'
    } else if (error.message.indexOf('timeout')) {
      errorMessage = '太卡了，换个网络'
    } else {
      errorMessage = '未知错误'
    }
  }
  message.error(errorMessage)
  return Promise.reject(errorMessage);
});

export default axiosInstance
