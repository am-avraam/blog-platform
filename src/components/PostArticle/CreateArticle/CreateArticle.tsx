import { Button, Form, Input, Space } from 'antd'
import { Redirect } from 'react-router-dom'

import Loading from '../../Loading/Loading'
import { create, changeStatus, updatePost } from '../../../redux/ownPostSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchPost, togglePage } from '../../../redux/allPostsSlice'

import classes from './CreateArticle.module.scss'

export type PostToCreate = [
  string | undefined,
  {
    article: {
      title?: string
      description?: string
      body?: string
      tagList?: string[]
    }
  }
]

export type ArticleInputValues = {
  title: string
  description: string
  text: string
  tagList: string[]
}

type Props = {
  slug: string
}

const CreateArticle = (props: Props) => {
  const messages = ['Your article successfully created', 'Your article successfully updated']
  const { slug } = props
  const dispatch = useAppDispatch()

  const aimArticleExist = useAppSelector((state) => state.posts.actualPost)
  const { updated } = useAppSelector((state) => state.articles)
  const aimArticle = aimArticleExist && aimArticleExist.slug === slug ? aimArticleExist : undefined

  const token = useAppSelector((state) => state.user.user?.user.token)
  const status = useAppSelector((state) => state.articles.status)
  const { loading } = useAppSelector((state) => state.articles)

  if (status === 'created') setTimeout(() => dispatch(changeStatus()), 7000)

  const onFinish = (values: ArticleInputValues) => {
    const postData: PostToCreate[1] = {
      article: { title: values.title, description: values.description, body: values.text, tagList: values.tagList },
    }
    if (slug) {
      dispatch(updatePost([slug, postData]))
      dispatch(fetchPost(slug))
      dispatch(togglePage(1))
    } else dispatch(create([token, postData]))
  }
  if (loading) return <Loading />
  if (updated && slug) return <Redirect push to="/articles" />
  return (
    <div className={classes.logform__wrapper}>
      <Form onFinish={onFinish}>
        {status === 'created' && (
          <h1 className={classes.logform__message_created}>{slug ? messages[1] : messages[0]}</h1>
        )}
        <h2 className={classes['logform__title-create']}>{slug ? 'Edit article' : 'Create new article'}</h2>

        <span className={classes['logform__input-sign']}>Title</span>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
          style={{ marginBottom: 21 }}
          initialValue={aimArticle?.title}
        >
          <Input maxLength={100} placeholder="Title" style={{ height: '40' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Short description</span>
        <Form.Item
          name="description"
          initialValue={aimArticle?.description}
          rules={[{ required: true, message: 'Please input short description' }]}
          style={{ marginBottom: 21 }}
        >
          <Input maxLength={100} placeholder="Short description" style={{ height: '40' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Text</span>
        <Form.Item
          name="text"
          initialValue={aimArticle?.body}
          rules={[{ required: true, message: 'Please input your article' }]}
          style={{ marginBottom: 21 }}
        >
          <Input.TextArea maxLength={1000} placeholder="Text" style={{ height: '168px' }} />
        </Form.Item>

        <span className={classes['logform__input-sign']}>Tags</span>

        <Form.List name="tagList" initialValue={aimArticle ? [...aimArticle.tagList] : ['']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ marginBottom: 5, width: 454 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: 'Missing tag. Please write it or delete the field' }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input placeholder="Tag" style={{ height: '40', width: '300' }} maxLength={30} />
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
            <a href="articles/" style={{ height: 40 }}></a>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateArticle
