import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd'

@Form.create()
class AddCategoryForm extends Component {
  render() {

    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Form.Item label="分类名称">
          { getFieldDecorator(
            'categoryName',
            {
              rules: [
                { required: true, message: '添加的分类名不能为空' }
              ]
            }
          )(<Input
            prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入分类名称"
          />) }
          
        </Form.Item>
      </Form>
    )
  }
}

export default AddCategoryForm
