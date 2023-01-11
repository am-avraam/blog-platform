import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, Redirect } from 'react-router-dom'

import { logIn } from '../../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { Value } from '../../../types/components/SignInTypes'

import classes from './SignIn.module.scss'

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoged, error, status } = useAppSelector((state) => state.user)
  if (isLoged) return <Redirect to="/articles" />
  const onFinish = (values: Value) => {
    const postData = { user: { email: values.email, password: values.password } }
    dispatch(logIn(postData))
  }

  const inputError =
    // eslint-disable-next-line multiline-ternary
    error && error === 'Authorization Error' ? (
      <div className={classes['logform__input-error']}>Incorrect email or password</div>
    ) : null

  return (
    <div className={classes.logform__wrapper}>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        {error && error === 'Authorization Error' && <h1 className={classes.logform__caution}>{error}</h1>}
        <h2 className={classes['logform__title-create']}>Sign In</h2>

        <span className={classes['logform__input-sign']}> Email address</span>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input correct email!', type: 'email' }]}
          style={{ marginBottom: '12', height: '40' }}
        >
          <Input type="email" placeholder="Email address" style={{ height: '40' }} maxLength={40} />
        </Form.Item>
        {inputError}
        <span className={classes['logform__input-sign']}> Password</span>
        <Form.Item
          style={{ marginBottom: 12 }}
          name="password"
          rules={[{ required: true, message: 'Your password needs to be at least 6 characters.', min: 6 }]}
        >
          <Input type="password" placeholder="Password" style={{ height: '40' }} maxLength={40} />
        </Form.Item>
        {inputError}
        <Form.Item>
          <Button
            disabled={status === 'loading'}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%', height: '40', background: ' #1890FF', marginTop: 21 }}
          >
            Login
          </Button>
        </Form.Item>
        <p className={classes.logform__postscript}>
          Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
        </p>
      </Form>
    </div>
  )
}

export default SignIn
