/* eslint-disable multiline-ternary */
import { Button, Form, Input, Space } from 'antd'
import { Redirect } from 'react-router-dom'
import { useEffect } from 'react'

import Loading from '../../Loading/Loading'
import { create, changeStatus, updatePost, resetCreated } from '../../../redux/ownPostSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchPost, togglePage } from '../../../redux/allPostsSlice'
import { PostToCreate, ArticleInputValues, Props } from '../../../types/components/CreateArticleTypes'
import {
  getActualPost,
  getAuthStatus,
  getAllPostsStatus,
  getUserName,
  getArticlesState,
  getToken,
  getMyArticlesStatus,
} from '../../../redux/selectors'

import classes from './CreateArticle.module.scss'

const CreateArticle = (props: Props) => {
  const dispatch = useAppDispatch()
  const { slug } = props

  const token = useAppSelector((state) => getToken(state))
  const isLoged = useAppSelector((state) => getAuthStatus(state))
  const username = useAppSelector((state) => getUserName(state))
  const status = useAppSelector((state) => getMyArticlesStatus(state))
  const aimArticleExist = useAppSelector((state) => getActualPost(state))
  const fetchAllStatus = useAppSelector((state) => getAllPostsStatus(state))
  const { updated, loading, created } = useAppSelector((state) => getArticlesState(state))

  const aimArticle = aimArticleExist && aimArticleExist.slug === slug ? aimArticleExist : undefined

  if (status === 'created' || status === 'updated')
    setTimeout(() => {
      dispatch(resetCreated())
      dispatch(changeStatus())
    }, 1000)

  useEffect(() => {
    if (slug && !aimArticleExist) {
      dispatch(fetchPost(slug))
    }
  }, [])

  const onFinish = (values: ArticleInputValues) => {
    const postData: PostToCreate[1] = {
      article: { title: values.title, description: values.description, body: values.text, tagList: values.tagList },
    }
    if (slug) {
      dispatch(updatePost([slug, postData]))
      dispatch(fetchPost(slug))
      dispatch(togglePage(1))
    } else {
      dispatch(create([token, postData]))
    }
  }

  const redirect =
    !isLoged || (slug && aimArticleExist?.author.username !== username) || (updated && slug) ? (
      <Redirect push to="/articles" />
    ) : created ? (
      <Redirect push to={`/articles/${created}`} />
    ) : null
  const onLoad =
    (!aimArticleExist && slug) || loading || status === 'loading' || fetchAllStatus === 'loading' ? <Loading /> : null
  const showContent = !!(!redirect && !onLoad)

  return (
    onLoad ||
    redirect ||
    ({ showContent } && (
      <div className={classes.logform__wrapper}>
        <Form onFinish={onFinish}>
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
    ))
  )
}

export default CreateArticle
