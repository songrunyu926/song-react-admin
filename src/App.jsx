import React, { Component, Suspense } from 'react'
import BasicLayout from './Components/BasicLayout'

import './index.less'

//使用前端路由
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import history from './utils/history'
import { noAuthRoutes } from './config/routes'
import { Spin } from 'antd'



export default class App extends Component {
  render() {
    return (
      <Suspense fallback={<Spin size="large" className="lazy-loading"/>}>
      <Router history={history}>
        <Switch>
        {
          noAuthRoutes.map((route, index) => <Route {...route} key={index}/>)
        }
        <BasicLayout />
        </Switch>
      </Router>
      </Suspense>
    )
  }
}
