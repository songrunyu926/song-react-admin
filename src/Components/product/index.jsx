import React, { Component } from 'react'
import { Card, Button, Icon, Table, Select, Input } from 'antd'
import { reqGetProduct } from '../../api/index'



class Product extends Component {

  state = {
    list: [],
    total: 0,
    product: {}
  }

  getProduct = async (pageNum,pageSize) => {
     const result = await reqGetProduct(pageNum, pageSize)
     this.setState({
        list: result.list,
        total: result.total
     })     
  }
  //切换到添加商品页面
  showAddProductForm = () => {
    this.props.history.push('/product/add')
  }

  //修改商品信息按钮的点击事件
  updateProduct = product => {
    return () => {
      this.setState({
        product
      })
      //需要跳转
      this.props.history.push('/product/update')
    }
  }

  componentDidMount() {
    //发送请求 请求商品数据
    this.getProduct(1,3)
  }

  render() {
    //表格数据类型
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '商品价格',
        dataIndex: 'price'
      },
      {
        title: '状态',
        dataIndex: "status",
        render: () => {
          return (
            <div>
              <Button type="primary">上架</Button>
              &nbsp;&nbsp;
              已下架
            </div>
          )
        }
      },
      {
        title: '操作',
        render: product => {
          return (
            <div>
              <Button type="link">详&nbsp;&nbsp;情</Button>
              <Button type="link" onClick={this.updateProduct(product)}>修&nbsp;&nbsp;改</Button>
            </div>
          )
        }
      }

    ]

    //从状态中获值
    const { list, total } = this.state


    return (
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={
          <div>
            <Select value={1}>
              <Select.Option value={1}>根据商品名称</Select.Option>
              <Select.Option value={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" style={{ width: 300, margin: '0 10px' }} />
            <Button>搜&nbsp;&nbsp;&nbsp;索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddProductForm}>
            <Icon type="plus" />
            添加商品
        </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={list}
          bordered
          rowKey="_id"
          title={() => '商品列表'}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            total: total,
            showTotal: total => `共 ${total} 条分类信息`,
            onChange: this.getProduct,
            onShowSizeChange: this.getProduct
          }}
        />
      </Card>
    )
  }
}

export default Product
