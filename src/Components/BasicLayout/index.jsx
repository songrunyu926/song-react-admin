import React,{ Component } from 'react'
import { Layout } from 'antd';
import LeftNav from './LeftNav'
import withCheckLogin from '../../containers/with-check-login/'
import { withRouter } from 'react-router-dom'
import HeadMain from './headmain/'


const { Header, Content, Footer, Sider } = Layout;


@withRouter
@withCheckLogin
class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    this.setState({ collapsed, isDisplay: !this.state.isDisplay });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav isDisplay={ this.state.isDisplay } />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeadMain></HeadMain>
          </Header>
          <Content style={{ margin: '40px 16px 0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout
