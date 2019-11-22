
//持久化存数据
export const setItem = (key,value) => {
  //如果是对象 要先转化成字符串 不是就不去转化
  try{
    value = JSON.stringify(value)
  }finally{
    window.localStorage.setItem(key,value)
  }
}

//获取数据 
export const getItem = key => {
  const value = window.localStorage.getItem(key)
  try {
    //是对象就转化
     return JSON.parse(value)
  } catch {
    //不是对象直接返回
    return value
  }
}

//删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
