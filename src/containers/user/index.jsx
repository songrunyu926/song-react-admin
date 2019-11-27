import React, { Component } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import { reqGetUser } from '../../api/index'
import dayjs from 'dayjs'

export default class User extends Component {

  state = {
    users: [],
    isShowAddUser: false
  }


  columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: createTime => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'roleId'
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <Button type="link">修改密码</Button>
            <Button type="link">删除用户</Button>
          </div>
        )
      }
    }
  ]
  //显示添加用户的模态框
  addUser = () => {
    this.setState({
      isShowAddUser: true
    })
  }
  //关闭显示用户的模态框


  //初始化获取数据
  componentDidMount() {
    reqGetUser()
      .then(res => {
        this.setState({
          users: res
        })
      })
  }

  render() {
    const {isShowAddUser} = this.state
    return (
      <div>
        <Card
          title={
            <Button type="primary" onClick={this.addUser}>添 加 用 户</Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={this.state.users}
            bordered
            rowKey='_id'
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              defaultPageSize: 5,
              total: this.state.users.length,
              showTotal: total => `共 ${total} 条分类信息`
            }}
          />
        </Card>

        <Modal
          title="添加用户"
          visible={isShowAddUser}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>


    )
  }
}
