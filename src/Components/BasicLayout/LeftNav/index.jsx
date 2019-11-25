import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import logo from '../../../assets/logo.png'
import { Link,withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'


import './index.less'
import menus from '../../../config/menus'
const { SubMenu } = Menu;

@withTranslation()
@withRouter
class LeftNav extends Component {

  state = {
    menus: []
  }

  createMenus(menus) {
    //引入t 给所有文本赋值
    const {t} = this.props;
    return menus.map(menu => {
      //判断有没有children属性
      if (menu.children) {
        return <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{t("route." + menu.title)}</span>
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
    const {t} = this.props
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{t("route." + menu.title)}</span>
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
    const {pathname} = this.props.location
    //调用方法
    const openKey = this.findOpenKey(menus,pathname)

    const {t} = this.props

    const menusList = this.createMenus(menus);
    return (
      <div>
         <div className="nav-logo" >
         <img src={logo} alt="logo" />
          <h2 style={{display: this.props.isDisplay ? 'block' : 'none'}}>
          {t("admin.title")}
          </h2>
          </ div>
          <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
            {menusList}
          </Menu>
      </div>
    )
  }
}

export default LeftNav
