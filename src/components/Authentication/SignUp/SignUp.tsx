import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { Link, Redirect } from 'react-router-dom'

import { createUser } from '../../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import Loading from '../../Loading/Loading'

import classes from './SignUp.module.scss'

export interface Value {
  username: string
  email: string
  password: string
  confirm: string
  remember: boolean
}

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoged, status, error } = useAppSelector((state) => state.user)
  const onFinish = (values: Value) => {
    const postData = { user: { username: values.username, email: values.email, password: values.password } }

    dispatch(createUser(postData))
  }
  if (status === 'loading') return <Loading />
  if (isLoged) return <Redirect to="/articles" />

  return (
    <div className={classes.logform__wrapper}>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <h2 className={classes['logform__title-create']}>Create new account</h2>
        <span className={classes['logform__input-sign']}> Username</span>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              pattern: /^(?=.{3,})[a-z][a-z0-9]*$/,

              message: 'Use lowercase English letters and numbers.',
            },
          ]}
          style={{ marginBottom: '12' }}
        >
          <Input placeholder="Username" style={{ height: '40' }} maxLength={20} />
        </Form.Item>
        <span className={classes['logform__input-sign']}> Email address</span>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input correct email!', type: 'email' }]}
          style={{ marginBottom: '12', height: '40' }}
        >
          <Input type="email" placeholder="Email address" style={{ height: '40' }} maxLength={40} />
        </Form.Item>

        <span className={classes['logform__input-sign']}> Password</span>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Your password needs to be at least 6 characters.', min: 6 }]}
          style={{ marginBottom: '12' }}
        >
          <Input type="password" placeholder="Password" style={{ height: '40' }} maxLength={40} />
        </Form.Item>

        <span className={classes['logform__input-sign']}> Repeat Password</span>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Passwords must match',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords must match!'))
              },
            }),
          ]}
        >
          <Input.Password visibilityToggle={false} placeholder={'Password'} style={{ height: '40' }} />
        </Form.Item>

        <Form.Item style={{ marginBottom: '-3' }}>
          <span className={classes.logform__separator}></span>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept it'))),
              },
            ]}
          >
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
          Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
