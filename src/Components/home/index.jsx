import React, { Component } from 'react'
import withCkeckLogin from '../../containers/with-check-login/'

import BasicLayout from '../basic-layout'


@withCkeckLogin
class Home extends Component {
  render() {

    return (
      <div>
       <BasicLayout></BasicLayout>
      </div>
    )
  }
}

export default Home

