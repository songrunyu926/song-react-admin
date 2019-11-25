import React, { Component } from 'react'
import { Card, Button, Icon, Table } from 'antd'
import { connect } from 'react-redux'
import { getCategoriesAsync } from '../../redux/action-creators/categories'
import { withTranslation } from 'react-i18next'

@withTranslation()
@connect(state => ({categories: state.categories}),{getCategoriesAsync})
class Categories extends Component {
   

  //添加按钮
  addCategory = () => {
    
  }

  componentDidMount() {
    this.props.getCategoriesAsync()

    this.columns = [
      {
        title: this.props.t('category.name'),
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: this.props.t('category.operation'),
        align: 'center',
        render: () => {
          return <div>
            <Button type="link">{this.props.t('category.amendSort')}</Button>
            <Button type="danger">{this.props.t('category.deleteSort')}</Button>
          </div>
        }
      }
    ];
  }

  render() { 
    const {categories, t} = this.props

    return (
      <Card title={t('category.sortList')}
        extra={<Button type="primary" className="addCategory" >
          <Icon type="plus" />
          {t('category.addSort')}</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            total:categories.length,
            showTotal:total => `共 ${total} 条分类信息`
          }}
        />
      </Card>
    )
  }
}

export default Categories
