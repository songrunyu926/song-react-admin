import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { reqGetUser, reqAddUser, reqDelUser, reqUpdateUser } from "../../api"
import { connect } from 'react-redux'
import { getRoleAsync } from '../../redux/action-creators/role'
import dayjs from "dayjs";

import AddUserForm from "./add-user-form";
import UpdateUserForm from "./update-user-form";


@connect(state => ({ roles: state.roles }), { getRoleAsync })
class User extends Component {
  state = {
    users: [], //用户数组
    addUserModalVisible: false, //是否展示创建用户的标识
    updateUserModalVisible: false //是否展示更新用户的标识
  };

  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "phone"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "所属角色",
      dataIndex: "roleId",
      render: roleId => {
        const role = this.props.roles.find(role => roleId === role._id)
        return role && role.name
      }
    },
    {
      title: "操作",
      render: user => {
        return (
          <div>
            <Button type="link" onClick={this.showUpdate(user)}>
              修改
            </Button>
            <Button type="link" onClick={this.delUser(user)}>
              删除
            </Button>
          </div>
        );
      }
    }
  ];

  //展示更新用户模态框
  showUpdate = user => {
    return () => {
      this.setState({
        updateUserModalVisible: true,
        user
      })
    }
  }

  //展示用户数据
  componentDidMount() {
    if (!this.state.users.length) {
      reqGetUser()
        .then(res => {
          this.setState({
            users: res
          })
        })
    }

    //获取角色信息 如果redux中没有角色数据的话
    if (!this.props.roles.length) {
      this.props.getRoleAsync()
    }
  }

  // 创建用户的回调函数
  addUser = () => {
    const { validateFields, resetFields } = this.addUserForm.props.form
    validateFields(async (err, values) => {
      if (!err) {
        //获取表单数据
        const { username, password, phone, email, roleId } = values
        //发送请求
        const newUser = await reqAddUser({ username, password, phone, email, roleId })
        //成功消息 清空 数据存在状态中 需要改变状态
        this.setState({
          addUserModalVisible: false,
          users: [...this.state.users, newUser]
        })
        message.success(`添加${username}用户信息成功`)
        resetFields()
      }
    })
  };

  //更新用户的回调函数
  updateUser = () => {
      //获取到修改的表单
      const { validateFields, resetFields } = this.updateUserForm.props.form
      validateFields(async (err, values) => {
        if (!err) {
          
          console.log(33333333333)
          //获取表单数据
          const { password } = values
          console.log(password)
          //获取username
          const { username } = this.state.user
          //发送请求
          await reqUpdateUser(username, password)
          //成功后
          message.success(username + '密码修改成功！')
          resetFields()
          this.setState({
            updateUserModalVisible: false
          })
        }
      })   
  };

  //删除用户的回调
  delUser = user => {
    const { username } = user
    return () => {
      Modal.confirm({
        title: (
          <span>
            您确认要删除
            <span style={{ color: "red", fontWeight: "bold" }}>
              {username}
            </span>
            用户数据吗？
          </span>
        ),
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          await reqDelUser(username);
          //更新状态
          this.setState({
            users: this.state.users.filter(u => u.username !== user.username)
          })
          message.success(`${username} 删除成功`)
        }
      });
    }
  }

  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      });
    };
  };

  
  render() {
    const { users, addUserModalVisible, updateUserModalVisible } = this.state;
    return (
      <Card
        title={
          <Button
            type="primary"
            onClick={this.switchModal("addUserModalVisible", true)}
          >
            创建用户
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            showQuickJumper: true
          }}
        />

        <Modal
          title="创建用户"
          visible={addUserModalVisible}
          onOk={this.addUser}
          onCancel={this.switchModal("addUserModalVisible", false)}
        >
          <AddUserForm
            roles={this.props.roles}
            wrappedComponentRef={form => (this.addUserForm = form)}
          />
        </Modal>

        <Modal
          title="更新用户"
          visible={updateUserModalVisible}
          onOk={this.updateUser}
          onCancel={this.switchModal("updateUserModalVisible", false)}
        >
          <UpdateUserForm
            wrappedComponentRef={form => (this.updateUserForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}
export default User;
