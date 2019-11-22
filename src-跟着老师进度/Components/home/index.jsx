import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

@connect(state => ({user: state.user}))
 class Home extends Component {
  render() {

    //获取用户数据

    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home
