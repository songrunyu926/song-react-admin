import React, { Component } from 'react'
import { Form, Icon, Input, Button} from 'antd';
import { connect } from 'react-redux'
import { getUserAsync } from '../../redux/action-creators/user'
import { setItem } from '../../utils/storage'
import withCheckLogin from '../with-check-login/'


import logo from '../../assets/logo.png'
import './login.less'

@withCheckLogin
@connect(null,{getUserAsync})
@Form.create()
class Login extends Component {

  //自定义校验表单的方法
  validator = (rule, value, callback) => {
    //rule 表示是哪个表单组件
    // 表单组件的值
    //输入完成后的我回调  必须调用  传的值就是错误信息  成功则直接调
    const name = rule.field === 'username' ? '用户名' : '密码'

    if(!value){
      callback(`${name}不能为空`)
    }else if(value.length <= 3){
      callback(`${name}必须大于3位`)
    }else if(value.length > 13){
      callback(`${name}必须小于13位`)
    }else if(!/\w/.test(value)){
      callback(`${name}只能包含数字，字母，下划线`)
    }else{
      callback()
    }
  }

  login = e => {
    //获取form上的需要用到的方法
    const { validateFields, resetFields } = this.props.form
    //禁止默认事件
    e.preventDefault()
    //表单数据是否验证通过
    validateFields((error,value) => {
      //参数为 错误信息 和 输入的值
      //console.log(error,value)
      if(!error){
        //发送请求
        const {username,password} = value
        this.props.getUserAsync(username,password)
          .then((res) => {
            //每次登录存入localstorage
            setItem('user',res)
            //登陆成功 
            this.props.history.replace('/')
          })
          .catch(err => {
            resetFields('password')
          })
      }
      resetFields('password')
    })
  }

  render() {

    //传出了一个方法 用于校验表单
    const { getFieldDecorator} = this.props.form

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>react后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用 户 登 录</h3>
          <Form onSubmit={this.login} className="login-form" >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { validator: this.validator }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { validator: this.validator }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                  autoComplete={'true'}
                />
              )}

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button login-btn">
                登录
          </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

//From.create 是一个高阶组件用法  作用： 给Login组件传递from属性 其中一件事是表单校验
export default Login 
