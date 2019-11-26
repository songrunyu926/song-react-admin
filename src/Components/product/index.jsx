import React, { Component } from 'react'
import { Card, Button, Icon, Table, Select, Input, message } from 'antd'
import { reqGetProduct, reqChangeProductStatus } from '../../api/index'



class Product extends Component {

  state = {
    list: [],
    total: 0,
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
      //需要跳转 
      //push的第二个参数可以传参数  组件可以通过location.state 获取这个值
      //地址后面加上ID -->  为了在更新商品页面刷新时 能够获取商品ID ---> 通过id发送请求获取商品数据
      this.props.history.push('/product/update/' + product._id,product)
    }
  }
  //展示商品信息详情的点击事件
  showDetail = product => {
    return () => {
      //跳转到商品详情页面
      this.props.history.push('/product/' + product._id,product)
    }
  }

  //改变商品状态的点击事件
  changeStatus = product => {
    return () => {
      //要获取商品id 和 商品改变后的状态值
      const productId = product._id
      const status = 3 - product.status
      const name = product.name
      //发送请求
      reqChangeProductStatus(productId,status)
        .then(res => {
          message.success(name + '状态更新成功')
          //改变本地的状态数据
          this.setState({
            list: this.state.list.map(product => {
              if(product._id === productId){
                return {...product, status}
              }
              return product
            })
          })
        })
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
        //dataIndex: "status", 要去掉 因为render中我们要获取整条数据 改变状态的请求需要商品id
        render: product => {
          //要根据当前状态显示
          const status = product.status
          return (
            <div>
        <Button type="primary" onClick={this.changeStatus(product)}>{status === 1? '上架' : '下架'}</Button>
              &nbsp;&nbsp;
              {status === 1? '已下架' : '已上架'}
            </div>
          )
        }
      },
      {
        title: '操作',
        render: product => {
          return (
            <div>
              <Button size="large" type="link" onClick={this.showDetail(product)}>详&nbsp;&nbsp;情</Button>
              <Button size="large" type="link" onClick={this.updateProduct(product)}>修&nbsp;&nbsp;改</Button>
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
