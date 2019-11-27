import React, { Component } from 'react'
import { Card, Button, Icon, Table, Select, Input, message } from 'antd'
import { reqGetProduct, reqChangeProductStatus, reqSearchProduct } from '../../api/index'



class Product extends Component {

  state = {
    list: [],
    total: 0,
    searchType: "productName",
    searchValue: '',
    current: 1,
    pageSize: 3
  }

  //设置是否要搜索
  isSearch = false; // 是否点击过搜索按钮
  currentSearchValue = ""; // 点击搜索按钮时缓存的搜索关键字

  //改变搜索类型的事件
  changeSearch = value => {
    this.setState({
      searchType: value
    })
  }
  //获取搜索值的change事件
  changeSearchValue = e => {
    this.setState({
      searchValue: e.target.value.trim()
    })
  }

  /*
    1. 什么情况搜索商品，什么情况全部商品
      - 看isSearch 是否为true
    2. 如果在第二页，点击搜索，显示的是第一页数据
      - 原因：搜索传递的参数固定是 1 3 --> 永远搜的是第一页 3条数据
      - 解决：将 current当前页数 受控起来
    3. 输入iphone，没有点击搜索按钮。 不按照关键字去搜，而搜全部商品（一定要点击搜索按钮，才按照关键字去搜）  
      问题二：第一次输入内容1，点击搜索。 第二次输入内容2，没有点击搜索。 搜索关键字是内容1还是内容2
      总结：必须点击搜索按钮才能搜索
  */

  //搜索按钮的点击事件
  search = async () => {
    const {pageSize,searchValue} = this.state
    //点击搜索按钮才搜索 所以把isSearch 改变
    this.isSearch = true
    //缓存搜索数据
    this.currentSearchValue = searchValue

    this.getProduct(1, pageSize)
  }

  componentDidMount() {
    //发送请求 请求商品数据
    this.getProduct(1, 3)
  }

  //请求商品信息函数
  getProduct = async (pageNum, pageSize) => {
    const {searchType} = this.state
    //设置初始值
    let result = []
    if(this.isSearch){
      //获取到搜索后的结果
       result = await reqSearchProduct({ searchType,searchValue: this.currentSearchValue, pageSize, pageNum})
    }else {
       result = await reqGetProduct(pageNum, pageSize)
    }
    
    this.setState({
      list: result.list,
      total: result.total,
      current: pageNum,
      pageSize
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
      this.props.history.push('/product/update/' + product._id, product)
    }
  }
  //展示商品信息详情的点击事件
  showDetail = product => {
    return () => {
      //跳转到商品详情页面
      this.props.history.push('/product/' + product._id, product)
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
      reqChangeProductStatus(productId, status)
        .then(res => {
          message.success(name + '状态更新成功')
          //改变本地的状态数据
          this.setState({
            list: this.state.list.map(product => {
              if (product._id === productId) {
                return { ...product, status }
              }
              return product
            })
          })
        })
    }
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
              <Button type="primary" onClick={this.changeStatus(product)}>{status === 1 ? '上架' : '下架'}</Button>
              &nbsp;&nbsp;
              {status === 1 ? '已下架' : '已上架'}
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
    const { list, total, searchType, current } = this.state


    return (
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={
          <div>
            <Select value={searchType} onChange={this.changeSearch}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" style={{ width: 300, margin: '0 10px' }} onChange={this.changeSearchValue} />
            <Button onClick={this.search}>搜&nbsp;&nbsp;&nbsp;索</Button>
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
            current,
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
