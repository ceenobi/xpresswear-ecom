import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import Link from 'next/link'
import axios from 'axios'
import Layout from '../components/Layout'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { getError } from '../utils/error'
import Head from 'next/head'
import Spin from '../components/Spinner'


export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  const { redirect } = router.query
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
 const [loading, setLoading] = useState(false)
  
 useEffect(() => {
    if (userInfo) {
      router.push('/')
    }
  }, [])

  const submitHandler = async ({ email, password }) => {
    try {
     setLoading(true)
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      })
      dispatch({ type: 'USER_LOGIN', payload: data })
      Cookies.set('userInfo', data)
      setLoading(false)
      router.push(redirect || '/')
    } catch (err) {
       setLoading(false)
      toast.error(getError(err), {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
    }
  }

  return (
    <div className='mt-md-5'>
      <Head>
        <title>Login</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Login</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          {loading && <Spin />}
          <Row className='py-5 justify-content-center'>
            <Col lg={5} md={5}>
              <Form onSubmit={handleSubmit(submitHandler)}>
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
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
                    placeholder='password'
                    {...register('password', {
                      required: true,
                      minLength: 5,
                    })}
                  />
                  <p className='text-start text-danger'>
                    {errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length should be more than 5'
                        : 'Password is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <div className='text-center mb-4'>
                  <Button type='submit' variant='info' size='lg'>
                    <i className='bi bi-lock-fill bicart mx-2'></i>Log in
                  </Button>
                  <ToastContainer />
                </div>
              </Form>
            </Col>
            <Col lg={4} md={5}>
              <div
                className='text-center cart-text py-5 px-4 shadow'
                style={{ background: '#111111' }}
              >
                <p className='mb-4 fw-bold lead'>I {"don't"} have an account</p>
                <Link href={`/register?redirect=${redirect || '/'}`} passHref>
                  <Button
                    className='fw-bold mx-1 p-3 mt-2'
                    variant='outline-dark'
                  >
                    Create an account
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </div>
  )
}

Login.Layout = Layout
