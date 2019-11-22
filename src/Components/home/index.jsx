import React, { Component } from 'react'
import withCheckLogin from '../../containers/with-check-login/'


@withCheckLogin
class Home extends Component {

  render() {
    //获取用户数据
    return (
      <div>
        home....
      </div>
    )
  }
}

export default Home
