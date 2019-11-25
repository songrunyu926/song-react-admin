import React, { Component } from 'react'
import { Card, Form, Select, Input, InputNumber, Button, Icon } from 'antd'
import Editor from './editor'
import { getCategoriesAsync } from '../../../redux/action-creators/categories'
import { connect } from 'react-redux'

const { Item } = Form

@connect(state => ({categories: state.categories}), {getCategoriesAsync})
class AddProductForm extends Component {

  componentDidMount() {
    //发送请求 获取分类信息
    //先判断下 redux中有没有分类信息 有的话就不用发送请求了
    if(!this.props.categories.length){
      this.props.getCategoriesAsync()
    }
  }

  render() {
    //获取属性中的分类信息
    const { categories } = this.props
    return (
      <Card title={
        <div>
          <Icon type="arrow-left" />
          &nbsp;&nbsp;添加商品
        </div>
      } >
        <Form>
          <Item label="商品名称" labelCol={{span: 2,offset: 7}} wrapperCol={{span: 8}}>
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item label="商品描述" labelCol={{span: 2,offset: 7}} wrapperCol={{span: 8}}>
            <Input placeholder="请输入商品描述" />
          </Item>
          <Item label="商品分类" labelCol={{span: 2,offset: 7}} wrapperCol={{span: 8}}>
            <Select placeholder="请选择商品分类">
              {
                categories.map(category => <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>)
              }
            </Select>
          </Item>
          <Item label="商品价格" labelCol={{span: 2,offset: 7}} wrapperCol={{span: 5}}>
            <InputNumber
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\\¥\s?|(,*)/g, '')}
              //onChange={onChange}
            />
          </Item>
          <Item label="商品详情" labelCol={{span: 2,offset: 7}} wrapperCol={{span: 20,offset: 2}}>
            <Editor />
          </Item>
          <Item wrapperCol={{span: 10,offset: 9}}>
            <Button size="large" type="primary" htmlType="submit" style={{width: 300}}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default AddProductForm
