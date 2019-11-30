import React, { Component } from 'react'
import { ConfigProvider } from 'antd'
import { connect } from 'react-redux'
//语言包
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

@connect(state => ({lang: state.lang}))
class Provider extends Component {

  //定义一个状态改变语言

  render() {
    let {lang} = this.props
    return (
      <ConfigProvider locale={ lang === 'en' ? enUS : zhCN}>
        {this.props.children}
      </ConfigProvider>
    )
  }
}

export default Provider
