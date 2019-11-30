import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from 'prop-types'

const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class AddUserForm extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="用户名">
          {getFieldDecorator("username",{
            rules: [
              {required: 'true',message: '用户名不能为空'}
            ]
          })(<Input placeholder="请输入用户名" />)}
        </Item>
        <Item label="密码">
          {getFieldDecorator("password", {
            rules: [
              {required: 'true',message: '密码不能为空'}
            ]
          })(
            <Input placeholder="请输入密码" type="password" suggested="current-password"/>
          )}
        </Item>
        <Item label="手机号">
          {getFieldDecorator("phone",{
            rules: [
              {required: 'true',message: '手机号不能为空'}
            ]
          })(<Input placeholder="请输入手机号" />)}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email",{
            rules: [
              {required: 'true',message: '邮箱不能为空'}
            ]
          })(<Input placeholder="请输入邮箱" />)}
        </Item>
        <Item label="角色">
          {getFieldDecorator("roleId",{
            rules: [
              {required: 'true',message: '用户名不能为空'}
            ]
          })(
            <Select placeholder="请选择分类">
              {
                this.props.roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
              }
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default AddUserForm;
