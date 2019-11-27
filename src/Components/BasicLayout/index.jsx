import React, { Component } from 'react'
import { Layout } from 'antd';
import LeftNav from './LeftNav'
import withCheckLogin from '../../containers/with-check-login/'
import { withRouter } from 'react-router-dom'
import HeadMain from './headmain/'
import { Route, Switch } from 'react-router-dom'
import { AuthRoutes } from '../../config/routes'
import { connect } from 'react-redux'


const { Header, Content, Footer, Sider } = Layout;


@withRouter
@withCheckLogin
@connect(state => ({ menus: state.user.user.menus }), {})
class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    this.setState({ collapsed, isDisplay: !this.state.isDisplay });
  };

  render() {
    //用户的菜单信息
    const { menus } = this.props
    //对路由权限进行过滤
    const filterRoutes = AuthRoutes.filter(route =>
      //404页面没有path 直接获取
      !route.path || menus.find(menu => 
        //路由相等 或者  以product 开头的
         menu === route.path || route.path.startsWith('/product') )
    )
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav isDisplay={this.state.isDisplay} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeadMain></HeadMain>
          </Header>
          <Content style={{ margin: '40px 16px 0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                {
                  //进行路由的筛选
                  filterRoutes.map((route, index) => <Route {...route} key={index} />)
                }
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>后台管理系统</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout
