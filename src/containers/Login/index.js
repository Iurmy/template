import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {push, goBack} from 'react-router-redux'
import {telReg} from '../../constants/reg'
import {postLoginRequest} from '../../actions'
import './index.css'

import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    let _this = this;
    console.log(this)
    this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          _this.props.postLogin({
            tel:values.username,
            password:values.password
          })
        } else {
          console.log(err);
          // _this.props
        }
      });
  }

  componentDidMount() {}
  checkUserNameOne (rule,value, callback) {
    // setTimeout(() => {
    //   value === "15188888888" ? callback("手机号已经被注册") : callback();
    // }, 2000);
    callback()
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: "请输入手机号!"
                }, {
                  pattern: telReg,
                  message: "请输入正确的手机号!"
                }, {
                  validator: this.checkUserNameOne.bind(this),
                  message: "手机号已经被注册!"
                }
              ]
            })(
              <Input
                prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: "请输入密码"
                }, {
                  pattern: /^[a-zA-Z0-9]{6,18}$/,
                  message: "密码为6-18位数字或字母"
                },
              ]
            })(
              <Input
                prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                type="password"
                placeholder="Password"/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  console.log(ownProps)
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postLogin:(payload)=>{
      console.log(payload)
      dispatch(postLoginRequest(payload))
    }
  }
}

// Login.propTypes = {   app: PropTypes.object.isRequired,   user_home:
// PropTypes.object.isRequired,   postLogin: PropTypes.func.isRequired,
// navigateTo: PropTypes.func.isRequired,   form: PropTypes.object }

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
