import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd'
import PropTypes from 'prop-types'


@Form.create()
class UpdateCategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  }

  validator = (rule, value, callback) => {
    if (value === this.props.categoryName) {
      callback("请修改分类名称，不能与之前一致");
    } else {
      callback();
    }
  };

  render() {

    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Form.Item label="分类名称">
          { getFieldDecorator(
            'categoryName',
            {
              rules: [
                { required: true,message: '修改的分类不能为空' },
                { validator: this.validator }
              ],
              //必须使用这个  不能使用input的value属性
              initialValue: this.props.categoryName
            }
          )(<Input
            prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />) }
          
        </Form.Item>
      </Form>
    )
  }
}

export default UpdateCategoryForm
