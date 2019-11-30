import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import { connect } from 'react-redux'
import { getCategoriesAsync, addCategoryAsync, removeCategoryAsync, updateCategoryAsync } from '../../redux/action-creators/categories'
import { withTranslation } from 'react-i18next'

import AddCategoryForm from './add-category-form'
import UpdateCategoryForm from './update-category-form'

@withTranslation()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync, addCategoryAsync, removeCategoryAsync, updateCategoryAsync })
class Categories extends Component {

  state = {
    addCategoryVisible: false,
    removeCategoryVisible: false,
    updateCategoryVisible: false,
    remove_id: '',
    category: {}
  }

  //删除分类
  delCategory = category => {
    return () => {
      Modal.confirm({
        title: (
          <span>
            您确认要删除
            <span style={{ color: "red", fontWeight: "bold" }}>
              {category.name}
            </span>
            分类数据吗？
          </span>
        ),
        okText: '确认删除',
        cancelText: '取消',
        onOk: () => {
          this.props.removeCategoryAsync(category._id);
        }
      });
    };
  };

  //显示添加分类模态框
  addCategoryVisible = () => {
    this.setState({
      addCategoryVisible: true
    })
  }

  //关闭添加分类模态框的事件
  hidden = () => {
    this.setState({
      addCategoryVisible: false
    })
    //清空表单
    this.form.props.form.resetFields();
  }

  //模态框添加分类按钮功能
  addCategory =  () => {
    // //判断是否验证成功并获取值
    this.form.props.form.validateFields(async (err,values) => {
      //没有错误
      if(!err){
        const { categoryName } = values

        await this.props.addCategoryAsync(categoryName)
        //提示添加成功
        message.success('分类信息添加成功')
        //添加成功后隐藏
        this.hidden()
      }
    })
  }

  //修改分类模态框展示
  updateCategoryVisible = category => {
    this.setState({
      updateCategoryVisible: true,
      category
    })
  }

  //修改分类模态框关闭
  updateHidden = () => {
    this.setState({
      updateCategoryVisible: false
    })
  }

  //点击确认修改分类
  updateCategory = () => {
    this.updateForm.props.form.validateFields(async (err,values) => {
      //没有错误
      if(!err){
        const { _id } = this.state.category
        const {categoryName} = values
        await this.props.updateCategoryAsync(_id, categoryName)
        //提示添加成功
        message.success('分类信息修改成功')
        //添加成功后隐藏
        this.updateHidden()
      }
    })
  }

  componentDidMount() {
    if(!this.props.categories.length){
      this.props.getCategoriesAsync()
    }
  }

  render() {
    const { categories, t } = this.props
    const { category } = this.state
    const columns = [ 
      {
        title: this.props.t('category.name'),
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: this.props.t('category.operation'),
        align: 'center',
        render: category => {
          return <div>
            <Button type="link" onClick={this.updateCategoryVisible.bind(null,category)}>{this.props.t('category.amendSort')}</Button>
            <Button type="danger" onClick={this.delCategory(category)}>{this.props.t('category.deleteSort')}</Button>
          </div>
        }
      }
    ];

    return (
      <div>
        <Card title={t('category.sortList')}
          extra={<Button type="primary" className="addCategory" onClick={this.addCategoryVisible}>
            <Icon type="plus" />
            {t('category.addSort')}</Button>}
        >
          <Table
            columns={columns}
            dataSource={categories}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              defaultPageSize: 3,
              total: categories.length,
              showTotal: total => `共 ${total} 条分类信息`
            }}
          />
        </Card>

        <Modal
          title="添加分类"
          visible={this.state.addCategoryVisible}
          onOk={this.addCategory}
          onCancel={this.hidden}
          width={400}
        >
          <AddCategoryForm wrappedComponentRef={(form) => this.form = form}/>
        </Modal>

        <Modal
          title="修改分类"
          visible={this.state.updateCategoryVisible}
          onOk={this.updateCategory}
          onCancel={this.updateHidden}
          width={400}
        >
          <UpdateCategoryForm categoryName={category.name} wrappedComponentRef={(form) => this.updateForm = form} />
        </Modal>

        
      </div>
    )
  }
}

export default Categories
