import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

import classes from './LogForm.module.scss'

const LogForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <div className={classes.logform__wrapper}>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <h1 className={classes['logform__title-create']}>Create new account</h1>
        <span className={classes['logform__input-sign']}> Username</span>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
          style={{ marginBottom: '12' }}
        >
          <Input placeholder="Username" style={{ height: '40' }} />
        </Form.Item>
        <span className={classes['logform__input-sign']}> Email address</span>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          style={{ marginBottom: '12', height: '40' }}
        >
          <Input type="email" placeholder="Email address" style={{ height: '40' }} />
        </Form.Item>
        {/* fege */}
        <span className={classes['logform__input-sign']}> Password</span>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          style={{ marginBottom: '12' }}
        >
          <Input type="password" placeholder="Password" style={{ height: '40' }} />
        </Form.Item>
        {/* fege */}

        <span className={classes['logform__input-sign']}> Repeat Password</span>
        <Form.Item
          name="confirm"
          style={{ height: '40' }}
          // label="Repeat Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* <Form.Item name="repeat_password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input type="password" placeholder="Password" style={{ height: '40' }} />
        </Form.Item> */}
        {/* fege */}
        <Form.Item style={{ marginBottom: '-3' }}>
          <span className={classes.logform__separator}></span>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{ color: '#595959 ' }}>I agree to the processing of my personal information</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%', height: '40', background: ' #1890FF' }}
          >
            Create
          </Button>
        </Form.Item>
        <p className={classes.logform__postscript}>
          Already have an account? <a href="#">Sign In. </a>
        </p>
      </Form>
    </div>
  )
}

export default LogForm
