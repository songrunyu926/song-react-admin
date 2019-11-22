import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'



//引入菜单的配置信息
import menus from '../../../config/menus'

import './index.less'

const { SubMenu } = Menu;

export default class LeftNav extends Component {

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
          key={menu.icon}
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
      <Menu.Item key={menu.icon}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  componentDidMount() {
    this.setState({
      menus: this.createMenus(menus)
    })
  }

  render() {
    return (
      <div>
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <h2>管理菜单</h2>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {this.state.menus}
        </Menu>
      </div>
    )
  }
}
