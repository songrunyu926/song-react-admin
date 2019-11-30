import React, { Component } from 'react'
import { Card, Form, Select, Input, InputNumber, Button, Icon, message } from 'antd'
import { getCategoriesAsync } from '../../../redux/action-creators/categories'
import { connect } from 'react-redux'
import BraftEditor from 'braft-editor'
import { reqAddProduct, reqUpdateProduct, reqGetOneProduct } from '../../../api'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

const { Item } = Form

@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class ProductForm extends Component {

  state = {
    product: null
  }
  //编辑器的方法
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  //编辑器验证逻辑
  validator = (rule, value, callback) => {
    if (!value || value.isEmpty()) {
      callback("请输入商品详情");
    } else {
      callback();
    }
  };

  AddProductSubmit = e => {

    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      //验证通过
      if (!err) {
        const { name, desc, categoryId, price, editorState } = values
        //富文本编辑器的内容 
        const detail = editorState.toHTML()
        console.log(detail)

        const { state,pathname } = this.props.location
        let content = '添加'
        if (pathname.startsWith('/product/update/')) {
          //判断productId来自哪里
          const productId = state ? state._id : this.state.product._id;
          //发送修改商品请求
          await reqUpdateProduct({ productId, name, desc, categoryId, price, detail })
          content = '修改'
        } else {
          //发送添加商品请求
          await reqAddProduct({ name, desc, categoryId, price, detail })
        }

        //成功之后跳转并提示
        message.success(content + name + '信息添加成功')

        this.props.history.push('/product')  
      }
    })
  }

  //点击图标回到上个页面
  goBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    //发送请求 获取分类信息
    //先判断下 redux中有没有分类信息 有的话就不用发送请求了
    if (!this.props.categories.length) {
      this.props.getCategoriesAsync()
    }
    //发送请求 如果是初始化页面 没有通过product页面获取到state数据 根据地址中的id 获取数据 改变状态
    if (!this.props.location.state) {
      reqGetOneProduct(this.props.match.params.id)
        .then(res => {
          this.setState({
            product: res
          })
        })
    }
  }
  render() {
    //获取属性中的分类信息
    const { categories, form: { getFieldDecorator } } = this.props
    //判断下来自哪个按钮点击的  添加商品
    let product = null

    const { state, pathname } = this.props.location
    
    //如果地址是修改地址 我们就让product不为null 
    if( pathname.startsWith('/product/update') ){
      //如果有state就用 state是push传过来的值   没有就使用状态数据中的product数据
      product = state || this.state.product
    }

    return (
      <Card title={
        <div>
          <Icon type="arrow-left" style={{ cursor: 'pointer' }} onClick={this.goBack} />
          &nbsp;&nbsp;{product ? '修改商品' : '添加商品'}
        </div>
      } >
        <Form onSubmit={this.AddProductSubmit}>
          <Item label="商品名称" labelCol={{ span: 2, offset: 7 }} wrapperCol={{ span: 8 }}>
            {
              getFieldDecorator('name', {
                rules: [
                  { required: true, message: '商品名称不能为空', whitespace: true }
                ],
                initialValue: product ? product.name : ''
              })(<Input placeholder="请输入商品名称" />)
            }
          </Item>
          <Item label="商品描述" labelCol={{ span: 2, offset: 7 }} wrapperCol={{ span: 8 }}>
            {
              getFieldDecorator('desc', {
                rules: [
                  { required: true, message: '商品描述不能为空', whitespace: true }
                ],
                initialValue: product ? product.desc : ''
              })(<Input placeholder="请输入商品描述" />)
            }
          </Item>
          <Item label="商品分类" labelCol={{ span: 2, offset: 7 }} wrapperCol={{ span: 8 }}>
            {
              getFieldDecorator('categoryId', {
                rules: [
                  { required: true, message: '商品分类不能为空', whitespace: true }
                ],
                initialValue: product ? product.categoryId : ''
              })(<Select placeholder="请选择商品分类">
                {
                  categories.map(category => <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>)
                }
              </Select>)
            }
          </Item>
          <Item label="商品价格" labelCol={{ span: 2, offset: 7 }} wrapperCol={{ span: 5 }}>
            {
              getFieldDecorator('price', {
                rules: [
                  { required: true, message: '商品价格不能为空' },
                ],
                initialValue: product ? product.price : ''
              })(<InputNumber
                formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/¥\s?|(,*)/g, '')}
                min={0}
              />)
            }
          </Item>
          <Item label="商品详情" labelCol={{ span: 2, offset: 7 }} wrapperCol={{ span: 20, offset: 2 }}>
            {getFieldDecorator("editorState", {
              validateTrigger: "onBlur", // 校验子节点的时机（失去焦点在进行表单校验）
              rules: [
                {
                  required: true,
                  validator: this.validator
                }
              ],
              initialValue: product ? BraftEditor.createEditorState(product.detail) : null
            })(
              <BraftEditor
                className="text-editor"
                contentClassName="text-editor-content"
                // controls={controls}
                // value={editorState}
                // onChange={this.handleEditorChange}
                placeholder="请输入商品详情"
              />
            )}
          </Item>
          <Item wrapperCol={{ span: 10, offset: 9 }}>
            <Button size="large" type="primary" htmlType="submit" style={{ width: 300 }}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default ProductForm
