import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import {Pagination, Upload, Button, Icon,Form, Input, Tooltip,  Cascader, Select, Row, Col, Checkbox, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const fileList = [
  {
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }
];

const props = {
  action: 'http://dev.xiaopaox.com:8080/chuangadmin/upload/image',
  listType: 'picture'
  // fileList: [...fileList]
};



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minH:window.innerHeight-88,
      confirmDirty: false,
      autoCompleteResult: [],
      
    }

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }



  componentDidMount() {
    this.props.form.setFieldsValue({
      dragger: [...fileList]
    });
  }
  _onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleChange = (content) => {
    console.log(content)
  }

  handleRawChange = (rawContent) => {
    console.log(rawContent)
  }
  render() {
    const { getFieldDecorator,setFieldValue } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: '<p>Hello World!</p>',
      onChange: this.handleChange,
      onRawChange: this.handleRawChange
    }

    
    return (
      <div
        style={{
        padding: 24,
        background: '#fff',
        textAlign: 'center',
        minHeight:this.state.minH
      }}>

      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="邮件"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              昵称&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地址"
        >
          {getFieldDecorator('residence', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          })(
            <Cascader options={residences} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="网址"
        >
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图文"
        >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input content!' }],
          })(
            <BraftEditor {...editorProps}/>
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="封面"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              // setFieldValue:[...fileList],
              rules: [{ required: true, message: 'Please upload picture!' }],
            })(
              <Upload {...props}>
          <Button>
            <Icon type="upload"/>
            上传
          </Button>
        </Upload>
            )}
          </div>
        </FormItem>
   
       
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>

        {/* <Upload {...props}>
          <Button>
            <Icon type="upload"/>
            upload
          </Button>
        </Upload> */}
      
        <Pagination
          style={{marginTop:'50px'}}
          showQuickJumper
          defaultCurrent={1}
          total={500}
          onChange={this
          ._onChange
          .bind(this)}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Home))
