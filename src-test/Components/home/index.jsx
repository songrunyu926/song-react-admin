import React, { Component } from 'react'
import withCkeckLogin from '../../containers/with-check-login'



@withCkeckLogin
class Home extends Component {
  render() {

    return (
      <div>
       home.....
      </div>
    )
  }
}

export default Home

