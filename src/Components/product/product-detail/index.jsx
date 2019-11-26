import React, { Component } from 'react'
import { Card, Icon, Descriptions } from 'antd'
import { connect } from 'react-redux'
import { getCategoriesAsync } from '../../../redux/action-creators/categories'
import { reqGetOneProduct } from '../../../api/index'

const { Item } = Descriptions


@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class ProductDetail extends Component {

  //状态存储商品数据
  state = {
    product: {}
  }

  componentDidMount() {
    //初始化组件时判断categories有没有内容 没有就发送请求
    if (!this.props.categories.length) {
      this.props.getCategoriesAsync()
    }
    //如果是直接到这个页面 就没有state 要发送请求 获取商品数据 存储到状态中
    if (!this.props.location.state) {
      reqGetOneProduct(this.props.match.params.id)
        .then(res => {
          this.setState({
            product: res
          })
        })
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {

    //有state的值
    const { categories, location: { state } } = this.props

    //先执行 短路或运算 如果没有state 就用后面的
    const { name, desc, categoryId, status, price, detail } = state || this.state.product

    const category = categories.find(category => category._id === categoryId)

    //当category有值才赋值
    const categoryName = category && category.name


    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" style={{ cursor: 'pointer' }} onClick={this.goBack} />
            &nbsp;&nbsp;商品详情
          </div>
        }
      >
        <Descriptions bordered column={3}>
          <Item label="商品名称" >{name}</Item>
          <Item label="商品介绍" span={2}>{desc}</Item>
          <Item label="商品价格">¥ {price}</Item>
          <Item label="商品状态" span={2}>
            {
              status === 1 ? '已下架' : '已上架'
            }
          </Item>
          <Item label="商品分类" span={3}>{categoryName}</Item>
          <Item label="商品详情">
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </Item>
        </Descriptions>

      </Card>
    )
  }
}

export default ProductDetail
