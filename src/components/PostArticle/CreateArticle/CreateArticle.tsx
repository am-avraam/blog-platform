import React from 'react'
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'

import classes from './CreateArticle.module.scss'

const CreateArticle = () => {
  const onFinish = (values: any) => {
    const postData = { user: { username: values.username, email: values.email, password: values.password } }
    console.log(values)

    // dispatch(createUser(postData))
  }

  return (
    <div className={classes.logform__wrapper}>
      <Form onFinish={onFinish}>
        <h2 className={classes['logform__title-create']}>Create new article</h2>

        <span className={classes['logform__input-sign']}>Title</span>
        <Form.Item
          name="intro"
          rules={[{ required: true, message: 'Please input Intro' }]}
          style={{ marginBottom: 21 }}
        >
          <Input maxLength={100} placeholder="Title" style={{ height: '40' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Short description</span>
        <Form.Item
          name="intro"
          rules={[{ required: true, message: 'Please input Intro' }]}
          style={{ marginBottom: 21 }}
        >
          <Input maxLength={100} placeholder="Short description" style={{ height: '40' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Text</span>
        <Form.Item
          name="intro"
          rules={[{ required: true, message: 'Please input Intro' }]}
          style={{ marginBottom: 21 }}
        >
          <Input.TextArea maxLength={100} placeholder="Text" style={{ height: '168px' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Tags</span>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ marginBottom: 5, width: 454 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'first']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input placeholder="Tag" style={{ height: '40', width: '300' }} />
                  </Form.Item>

                  <Button danger onClick={() => remove(name)} style={{ height: '40', width: 120, marginLeft: 9 }}>
                    Delete
                  </Button>
                </Space>
              ))}
              <Form.Item style={{ marginBottom: 21, display: 'inline-block' }}>
                <Button onClick={() => add()} style={{ width: 136, height: 40 }}>
                  Add tag
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: 320, height: '40', background: ' #1890FF' }}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateArticle
