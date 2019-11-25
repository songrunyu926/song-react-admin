import React, { Component } from 'react'
import { Button, Icon, Modal } from 'antd'
import screenfull from 'screenfull'
import { withTranslation } from "react-i18next";
import { connect } from 'react-redux'
import { removeItem } from '../../../utils/storage'
import { removeUser } from '../../../redux/action-creators/user'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'

import menus from '../../../config/menus'

import './index.less'

@withRouter
@connect((state) => ({ username: state.user.user.username }), { removeUser })
@withTranslation()
class HeadMain extends Component {

  state = {
    isFullScreen: false,
    isChinese: this.props.i18n.language === "zh" ? true : false,
    datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    pathname: '',
    title: ''
  }

  //退出登录
  logout = () => {
    Modal.confirm({
      title: '您确认要退出登录么?',
      okText: '确认退出',
      cancelText: '取消',
      onOk: () => {
        //清空数据 跳转
        removeItem('user')
        this.props.removeUser()
        //跳转
        this.props.history.replace('/login')
      }
    });
  }

  toggleScreen = () => {
    //切换全屏显示
    screenfull.toggle()
  }

  change = () => {
    //切换按钮显示
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }

  changeLang = () => {
    const isChinese = !this.state.isChinese;
    this.setState({
      isChinese
    });
    this.props.i18n.changeLanguage(isChinese ? "zh" : "en");
  };

  static getDerivedStateFromProps(nextProp, prevState) {
    const {pathname} = nextProp.location

    if(pathname === prevState.pathname){
      return prevState
    }

    let title = '';

    console.log(menus.length)
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      console.log(menu)
      if(menu.children){
        const cMenu = menu.children.find(cMenu => cMenu.path === pathname)
        if(cMenu){
          title = cMenu.title
          console.log(title)
          break;
        }
      }else {
        if(menu.path === pathname){
          title = menu.title
          console.log(title)
          break;
        }
      }     
    }
    
    return {
      pathname,
      title: "route." + title
    }
  }

  componentDidMount() {
    // 切换图标显示
    screenfull.on("change", this.change);

    this.timer = setInterval(() => {
      this.setState({
        // date: this.formatDate(Date.now())
        datetime: dayjs().format("YYYY/MM/DD HH:mm:ss")
      });
    }, 1000);
  }


  //解绑事件
  componentWillUnmount() {
    screenfull.off('change', this.change)

    clearInterval(this.timer)
  }

  //更新标题信息
 

  render() {
    const { datetime,title } = this.state
    const { username, t } = this.props
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.toggleScreen}>
            <Icon type={this.state.isFullScreen ? "fullscreen-exit" : "fullscreen"}></Icon>
          </Button>
          <Button size="small" className="lang-btn" onClick={this.changeLang}>
            {this.state.isChinese ? "English" : "中文"}
          </Button>
          <span> {t('admin.header') + username}</span>
          <Button type="link" className="exit-btn" onClick={this.logout}>
            {t('admin.btnText')}
          </Button>
        </div>
        <div className="header-main-bottom">
          <div className="title">
           {t(title)}
          </div>
          <div className="time">
            {datetime}
          </div>
        </div>
      </div>
    )
  }
}

export default HeadMain
