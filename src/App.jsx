import React, { Component } from 'react'

import './index.less'

//使用前端路由
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from './config/routes'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {
            routes.map((route, index) => <Route {...route} key={index}/>)
          }
        </Switch>
      </Router>
    )
  }
}
