import React, { Component } from 'react'
import withCkeckLogin from '../../containers/with-check-login'

@withCkeckLogin
class NotMatch extends Component {
  render() {
    return (
      <div>
        404
      </div>
    )
  }
}

export default NotMatch
