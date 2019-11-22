//设计一个高阶组件 用来检查是否有用户信息
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const withCheckLogin = (WrappedComponent) => {

  const newCompoment = class extends Component {
    static displayName = `CheckLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;
    render() {
      const { location, token, ...rest } = this.props

      if (location.pathname === '/login') {
        if (token) {
          return <Redirect to='/' />
        }
      } else {
        if (!token) {
          return <Redirect to='/login' />
        }
      }

      // 定义高阶组件时，需要将其接受到的props，在往下传递
      return <WrappedComponent {...rest} location={location} />
    }
  }

  return connect(state => ({ token: state.user.token }), null)(newCompoment)
}

export default withCheckLogin
