import React, { Component, Fragment } from 'react'
import { Icon, Drawer, Divider, Button } from 'antd'
import { SketchPicker } from 'react-color'
import { getItem, setItem } from '../../../utils/storage'

import './index.less'

export default class ThemePicker extends Component {

  state = {
    visible: false,
    background: getItem('themeColor') || '#f40', //先看本地有没有主题颜色 初始化不然不能自动刷新调用一次
    prevColor: getItem('themeColor') || '#f40'
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onOpen = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
      background: this.state.prevColor
    });
  };
  //SketchPick 提供的函数 可以获取到选中的颜色
  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  //减少DOM操作 放在初始化组件中
  componentDidMount() {
    //只创建一次style标签 但是其他的方法中要拿到所以定义在this 上
    this.styleEl = document.createElement('style')
    //加入到head中
    document.querySelector('head').appendChild(this.styleEl)
    //调用一次getColor 初始化主题颜色
    this.changeThemeColor()
  }

  //改变主题颜色
  changeThemeColor = () => {
    //设置style 的 内容 把background 选中的颜色给 style 覆盖之前的样式

    //1 获取background
    const { background } = this.state
    //2 创建style 内容 就是一个一个去要覆盖的样式
    const style = `
    .ant-menu.ant-menu-dark .ant-menu-item-selected{
      background-color: ${background};
    }
    .theme-picker{
      background-color: ${background};
    }
    .ant-btn-link{
      color: ${background};
    }
    .ant-btn-link:hover, .ant-btn-link:focus{
      color: ${background};
      border-color: ${background};
    }
    .header-main .header-main-top{
      border-bottom: 1px solid  ${background};
    }
    .ant-btn-primary {
      color: #fff;
      background-color: ${background};
      border-color: ${background};
    }
    .ant-btn-link {
      color: ${background};
    }
    .ant-btn-danger {
      color: #fff;
      background-color: ${background};
      border-color: ${background};
  }
    `
    //加入到style标签中
    this.styleEl.innerHTML = style
    //点击刷新就还原了配置文件的颜色 所以我们要存到localstorage中 保存我们改变的主题颜色
    setItem('themeColor',background)
    //关闭抽屉组件
    this.setState({
      visible: false,
      prevColor: background
    })
  }


  render() {
    return (
      <Fragment>

        <div className="theme-picker" onClick={this.onOpen}>
          <Icon type="setting" className="theme-picker-icon"></Icon>
        </div>

        <Drawer
          title="修改主题颜色"
          width={300}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <SketchPicker

            color={this.state.background}
            onChangeComplete={this.handleChangeComplete} />

          <Divider />

          <Button onClick={this.onClose}>取  消</Button>
          <Button type="primary" onClick={this.changeThemeColor}>确  定</Button>
        </Drawer>

      </Fragment>
    )
  }
}
