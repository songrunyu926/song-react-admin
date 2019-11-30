import React, { Component } from "react";
import { Card, Button, Table, Radio, Modal, message } from "antd";
import dayjs from 'dayjs'

import AddRoleForm from "./add-role-form";
import UpdateRoleForm from "./update-role-form";

import { getRoleAsync, addRoleAsync, updateRoleAsync, removeRoleAsync } from "../../redux/action-creators/role"
import { connect } from 'react-redux'

const RadioGroup = Radio.Group;

@connect(state => ({ roles: state.roles, username: state.user.user.username }), { getRoleAsync, addRoleAsync, updateRoleAsync, removeRoleAsync })
class Role extends Component {
  state = {
    value: "", //单选的默认值，也就是选中的某个角色的id值
    addRoleModalVisible: false, //是否展示创建角色的标识
    updateRoleModalVisible: false, //是否展示设置角色的标识
    isDisabled: true
  };

  columns = [
    {
      dataIndex: "_id",
      render: id => <Radio value={id} />
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: createTime => dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render: authName => authName && dayjs(authName).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  onRadioChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
      //点击了单选框 才能点击修改按钮
      isDisabled: false
    });
  };

  switchModal = (key, value) => {
    return () => {
      this.setState({ [key]: value });
    };
  };

  //创建角色的回调函数
  addRole = () => {
    //使用传过来的表单实例对象来添加角色
    const { validateFields, resetFields } = this.addRoleForm.props.form
    validateFields(async (err, values) => {
      if (!err) {
        //获取表单数据
        const { name } = values
        //发送添加请求
        await this.props.addRoleAsync(name)
        //提示并清空 
        this.setState({
          addRoleModalVisible: false
        })
        message.success(name + '角色添加成功')
        resetFields()
      }
    })

  };
  //设置角色权限的回调函数
  updateRole = () => {
    const { validateFields, resetFields } = this.updateRoleForm.props.form
    validateFields(async (err, values) => {
      if (!err) {
        //发送更新请求需要三个参数 roleId, authName, menus
        const { menus } = values //menus
        const roleId = this.state.value
        const authName = this.props.username
        //发送请求
        await this.props.updateRoleAsync({ menus, roleId, authName })
        //提示成功 并关闭弹框
        message.success('修改角色信息成功')
        // 清空表单
        resetFields();
        this.setState({
          updateRoleModalVisible: false
        })
      }
    })
  };

  //展示角色数据
  componentDidMount() {
    if (!this.props.roles.length) {
      this.props.getRoleAsync()
    }
  }
  //删除角色信息 
  removeRole = role => {
    return () => {
      const { name, _id } = role
      Modal.confirm({
        title: (
          <span>
            您确认要删除
            <span style={{ color: "red", fontWeight: "bold" }}>
              {name}
            </span>
            角色数据吗？
          </span>
        ),
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          await this.props.removeRoleAsync(_id)
          message.success(`${name} 删除成功`)
        }
      });
    }
  }

  render() {
    const {
      value,
      isDisabled,
      addRoleModalVisible,
      updateRoleModalVisible
    } = this.state;

    const { roles } = this.props

    //根据value的值去找角色信息
    const role = roles.find(role => role._id === value)

    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchModal("addRoleModalVisible", true)}
            >
              创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={this.switchModal("updateRoleModalVisible", true)}
            >
              设置角色权限
            </Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={this.removeRole(role)}
            >
              删除角色
            </Button>
          </div>
        }
      >
        <RadioGroup
          onChange={this.onRadioChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showQuickJumper: true
            }}
          />
        </RadioGroup>

        <Modal
          title="创建角色"
          visible={addRoleModalVisible}
          onOk={this.addRole}
          onCancel={this.switchModal("addRoleModalVisible", false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={updateRoleModalVisible}
          onOk={this.updateRole}
          onCancel={this.switchModal("updateRoleModalVisible", false)}
        >
          <UpdateRoleForm
            role={role}
            wrappedComponentRef={form => (this.updateRoleForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
