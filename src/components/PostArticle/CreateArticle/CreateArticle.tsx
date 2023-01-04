import React from 'react'
import { Button, Form, Input, Space } from 'antd'

import { create } from '../../../redux/ownPostSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import classes from './CreateArticle.module.scss'

export type PostToCreate = [
  string | undefined,
  {
    article: {
      title: string
      description: string
      body: string
      tagList: string[]
    }
  }
]

export type ArticleInputValues = {
  title: string
  description: string
  text: string
  tagList: string[]
}

const CreateArticle = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.user?.user.token)

  const onFinish = (values: ArticleInputValues) => {
    console.log(values)

    const postData: PostToCreate[1] = {
      article: { title: values.title, description: values.description, body: values.text, tagList: values.tagList },
    }
    dispatch(create([token, postData]))
    // console.log(postData)
  }

  return (
    <div className={classes.logform__wrapper}>
      <Form onFinish={onFinish}>
        <h2 className={classes['logform__title-create']}>Create new article</h2>

        <span className={classes['logform__input-sign']}>Title</span>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
          style={{ marginBottom: 21 }}
        >
          <Input maxLength={100} placeholder="Title" style={{ height: '40' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Short description</span>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Please input short description' }]}
          style={{ marginBottom: 21 }}
        >
          <Input maxLength={100} placeholder="Short description" style={{ height: '40' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Text</span>
        <Form.Item
          name="text"
          rules={[{ required: true, message: 'Please input your article' }]}
          style={{ marginBottom: 21 }}
        >
          <Input.TextArea maxLength={100} placeholder="Text" style={{ height: '168px' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Tags</span>

        <Form.List name="tagList" initialValue={['']}>
          {(fields, { add, remove }) => (
            <>
              {/* <Form.Item
                name={['first']}
                rules={[{ required: true, message: 'Missing first name' }]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Tag" style={{ height: '40', width: '300' }} />
              </Form.Item> */}
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ marginBottom: 5, width: 454 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: 'Missing tag. Please write it or delete the field' }]}
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
                <Button
                  onClick={() => add()}
                  style={{
                    width: 136,
                    height: 40,
                    border: '1px solid #1890FF',
                    color: '#1890FF',
                  }}
                >
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
