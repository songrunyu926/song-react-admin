import React, { Component } from 'react'

import './index.less'

//使用前端路由
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import history from './utils/history'
import routes from './config/routes'

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {
            routes.map((route, index) => <Route {...route} key={index}/>)
          }
        </Switch>
      </Router>
    )
  }
}
