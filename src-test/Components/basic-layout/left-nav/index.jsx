import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import logo from '../../../assets/logo.png'
import { Link,withRouter } from 'react-router-dom'



//引入菜单的配置信息
import menus from '../../../config/menus'

import './index.less'

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {

  //把menus信息存在状态中，方便后期做权限管理 按需加载菜单项
  state = {
    menus: []
  }

  //根据配置信息 生成菜单虚拟DOM的方法
  createMenus(menus) {
    return menus.map(menu => {
      //判断有没有children属性
      if (menu.children) {
        return <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {
            menu.children.map(cMenu => this.createCMenus(cMenu))
          }
        </SubMenu>
      } else {
        return this.createCMenus(menu)
      }
    })
  }
  //封装一个遍历的方法
  createCMenus = menu => {
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  findOpenKey = (menus,pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if(menu.children){
        //这一步是判断 打开的cMenu  是不是在这个menu里
        const cMenu = menu.children.find(cMenu => cMenu.path === pathname)
        if(cMenu){
          //需要的是menu 的path 因为要打开他
          return menu.path
        }
      }
    }

  }

  componentDidMount() {
    this.setState({
      menus: this.createMenus(menus)
    })
  }

  render() {

    //通过withRouter组件可以获取路由组件的属性
    const { pathname } = this.props.location

    const openKey = this.findOpenKey(menus, pathname)
   
    return (
      <div>
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <h2>管理菜单</h2>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
          {this.state.menus}
        </Menu>
      </div>
    )
  }
}

export default LeftNav
