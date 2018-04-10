import React, {Component} from 'react'
import {Icon, Input} from 'antd';
import {telReg} from '../../../constants/reg'
import './index.css'

export default class TelInput extends Component {
  constructor(props) {
    super(props)
    this.state={
      hasErr:false
    }
  }
  componentWillMount() {
    
  }

  checkUserNameOne = (value, callback) => {
    setTimeout(() => {
      value === "15188888888" ? callback("手机号已经被注册") : callback();
    }, 2000);
  }


  render() {
    
    return (
      <div className={`tel-input${this.state.hasErr ? ' hasErr':''}`}>
        {this
          .props
          .getFieldDecorator('tel', {
            rules: [
              { required: true, message: "请输入手机号!" },
              {
                pattern: telReg,
                message: "请输入正确的手机号!"
              },
              {
                validator: (rule, value, callback) => {
                  this.checkUserNameOne(value, callback);
                },
                message: "手机号已经被注册!"
              }
            ]
          })(
            <Input
              prefix={< Icon type = "phone" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Username"/>
          )}
      </div>
    )
  }
}
