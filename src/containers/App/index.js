import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {getHomeRoutes} from '../../routes'
import {Layout, Menu, Breadcrumb, Icon, Input} from 'antd';
import {
  NavBar
} from '../../components'
import './index.css'

const {Header, Content, Sider} = Layout;

class App extends Component {
  state = {
    hidden: true,
    w: document
      .querySelector('body')
      .offsetWidth,
    h: window.screen.height
  }
  componentDidMount() {}
  render() {
    const pro = this.props
    console.log(pro)
    return (
      <Layout>
        <NavBar/>
        <Layout className="index-content" style={{
          marginLeft: 200
        }}>
          <Header
            style={{
            background: '#fff',
            paddingLeft:'20xp'
          }}>
          后台系统
          </Header>
          <Content
            style={{
            margin: '24px 16px 0',
            overflow: 'initial'
          }}>
          {getHomeRoutes(pro)}
         
          </Content>
        </Layout>
      </Layout>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
