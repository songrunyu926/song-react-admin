import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' 
import ConfigProvider from './containers/config-provider'
import store from './redux/store'
import App from './App'
//引入使用i18n配置
import './i18n';



ReactDOM.render(<Provider store={store}><ConfigProvider>
  <App />
  </ConfigProvider></Provider>,document.getElementById('root'))
