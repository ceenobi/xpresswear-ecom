import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Store } from '../utils/store'
import { getError } from '../utils/error'
import axios from 'axios'
import Head from 'next/head'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast, Slide } from 'react-toastify'
import Layout from '../components/Layout'
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  ListGroup,
  Tab,
} from 'react-bootstrap'

export default function Profile() {
  const { state, dispatch } = useContext(Store)
   const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm()
  const { userInfo } = state

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login')
    }
    setValue('name', userInfo.name)
    setValue('email', userInfo.email)
  }, [])

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error(
        "Passwords don't match",
        {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
        },
      )
      return;
    }
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      dispatch({ type: 'USER_LOGIN', payload: data })
      Cookies.set('userInfo', data)
     
      toast.success('Profile update success', {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
    } catch (err) {
      toast.error(getError(err), {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
    }
  }

  return (
    <div className='mt-md-5'>
      <Head>
        <title>Profile</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Dashboard</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Container>
            <Tab.Container
              id='list-group-tabs-example'
              defaultActiveKey='#link1'
            >
              <Row>
                <Col lg={2}>
                  <ListGroup>
                    <Link href='/profile' passHref>
                      <ListGroup.Item action href='#link1'>
                        User Profile
                      </ListGroup.Item>
                    </Link>
                    <Link href='/order-history' passHref>
                      <ListGroup.Item action href='#link2'>
                        Order History
                      </ListGroup.Item>
                    </Link>
                  </ListGroup>
                </Col>
                <Col sm={5}>
                  <Tab.Content>
                    <Tab.Pane eventKey='#link1'>
                      <Form onSubmit={handleSubmit(submitHandler)}>
                        <FloatingLabel
                          controlId='floatingName'
                          label='*Name'
                          className='mb-4'
                        >
                          <Form.Control
                            type='text'
                            placeholder='create username'
                            {...register('name', {
                              required: true,
                              minLength: 2,
                            })}
                          />
                          <p className='text-start text-danger'>
                            {errors.name
                              ? errors.name.type === 'minLength'
                                ? 'Name should be more than 1'
                                : 'Name is required'
                              : ''}
                          </p>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId='floatingInput'
                          label='*Email address'
                          className='mb-4'
                        >
                          <Form.Control
                            type='email'
                            placeholder='name@example.com'
                            {...register('email', {
                              required: true,
                              pattern:
                                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            })}
                          />
                          <p className='text-start text-danger'>
                            {errors.email
                              ? errors.email.type === 'pattern'
                                ? 'Email is not valid'
                                : 'Email is required'
                              : ''}
                          </p>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId='floatingPassword'
                          label='*Password'
                          className='mb-4'
                        >
                          <Form.Control
                            type='password'
                            placeholder='Password'
                            {...register('password', {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          <p className='text-start text-danger'>
                            {errors.password
                              ? 'Password length should be more than 5'
                              : ''}
                          </p>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId='floatingConfirmPassword'
                          label='*Confirm Password'
                          className='mb-4'
                        >
                          <Form.Control
                            type='password'
                            placeholder='confirm Password'
                            {...register('confirmPassword', {
                              required: true,
                              minLength: 5,
                            })}
                          />
                          <p className='text-start text-danger'>
                            {errors.confirmPassword
                              ? 'Password length should be more than 5'
                              : ''}
                          </p>
                        </FloatingLabel>
                        <div className='text-center py-2'>
                          <Button
                            type='submit'
                            variant='info'
                            size='lg'
                            className='fw-bold shadow'
                          >
                            UPDATE
                          </Button>
                          <ToastContainer />
                        </div>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </div>
      </>
    </div>
  )
}

Profile.Layout = Layout
