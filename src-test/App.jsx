import React, { Component } from 'react'

import './index.less'

//使用前端路由
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import history from './utils/history'
import { AuthRoutes, noAuthRoutes } from './config/routes'
import BasicLayout from './Components/basic-layout'

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
        {
            noAuthRoutes.map((route, index) => <Route {...route} key={index} />)
          }
        <BasicLayout>
          <Switch>
            {
              AuthRoutes.map((route, index) => <Route {...route} key={index} />)
            }
          </Switch>
        </BasicLayout>
        </Switch>
      </Router>
    )
  }
}
