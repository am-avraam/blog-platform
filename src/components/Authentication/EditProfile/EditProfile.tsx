import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { Link, Redirect } from 'react-router-dom'

import { PostDataToUpdate, createUser, updateUser } from '../../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import Loading from '../../Loading/Loading'

import classes from './EditProfile.module.scss'

export interface Values {
  username: string
  email: string
  password: string
  confirm: string
  remember: boolean
}

export type ValuesToUpdate = {
  username: string
  email: string
  password: string
  image: string
}

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoged, status, error, user } = useAppSelector((state) => state.user)
  const onFinish = (values: Values) => {
    const postData: PostDataToUpdate = {
      user: {
        ...Object.fromEntries(Object.entries(values).filter((el) => el[1])),
      },
    }

    dispatch(updateUser(postData))
  }
  if (status === 'loading') return <Loading />

  return (
    <div className={classes.logform__wrapper}>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <h2 className={classes['logform__title-create']}>Edit Profile</h2>
        <span className={classes['logform__input-sign']}> Username</span>
        <Form.Item
          name="username"
          initialValue={user?.user.username}
          rules={[
            {
              required: true,
              pattern: /^(?=.{3,})[a-z][a-z0-9]*$/,
              message: 'Use lowercase English letters and numbers.',
            },
          ]}
          style={{ marginBottom: '12' }}
        >
          <Input style={{ height: '40' }} maxLength={20} />
        </Form.Item>
        <span className={classes['logform__input-sign']}> Email address</span>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input correct email!', type: 'email' }]}
          style={{ marginBottom: '12' }}
          initialValue={user?.user.email}
        >
          <Input type="email" style={{ height: '40' }} maxLength={40} />
        </Form.Item>

        <span className={classes['logform__input-sign']}> New password</span>
        <Form.Item
          name="password"
          rules={[{ required: false, message: 'Your password needs to be at least 6 characters.', min: 6 }]}
          style={{ marginBottom: '12' }}
        >
          <Input type="password" placeholder="New password" style={{ height: '40' }} maxLength={40} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Avatar image (url)</span>
        <Form.Item
          style={{ marginBottom: '21' }}
          name="image"
          rules={[{ required: false }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
        >
          <Input placeholder="Avatar image" style={{ height: '40' }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%', height: '40', background: ' #1890FF' }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditProfile
