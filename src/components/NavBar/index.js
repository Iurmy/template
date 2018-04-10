import React, { PureComponent } from 'react'
import {Layout, Menu, Breadcrumb, Icon, Input} from 'antd';
import './index.css'

const Search = Input.Search;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

export default class NavBar extends PureComponent {
  render() {
    const { navbar, history } = this.props
    return(
      <Sider
      style={{
      height: '100vh',
      position: 'fixed',
      left: 0
    }}
      breakpoint="lg"
      collapsedWidth="0">
      <Search
        placeholder="搜索"
        onSearch={value => console.log(value)}
        enterButton
        className="serch"/>
        
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{
        overflowY: 'auto',
        height: '100%',
        borderRight: 0
      }}
        theme='dark'
        className="left-bar">
        <SubMenu key="sub1" title={< span > <Icon type="user"/>管理员</span>}>
          <Menu.Item key="1">添加管理员</Menu.Item>
          <Menu.Item key="2">管理员列表</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={< span > <Icon type="laptop"/>轮播图</span>}>
          <Menu.Item key="5">添加轮播图</Menu.Item>
          <Menu.Item key="6">轮播图列表</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={< span > <Icon type="notification"/>活动管理</span>}>
          <Menu.Item key="9">添加活动</Menu.Item>
          <Menu.Item key="10">活动列表</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={< span > <Icon type="notification"/>帮助</span>}>
          <Menu.Item key="13">添加帮助</Menu.Item>
          <Menu.Item key="14">option13</Menu.Item>
          <Menu.Item key="15">option15</Menu.Item>
          <Menu.Item key="16">option16</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    )
  }
}
