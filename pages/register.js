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
import { getError } from '../utils/error'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast, Slide } from 'react-toastify'
import Head from 'next/head'
import Spin from '../components/Spinner'

export default function Register() {
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

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
      return
    }
    try {
       setLoading(true)
      const { data } = await axios.post('/api/users/register', {
        name,
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
        <title>Create account</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Register</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          {loading && <Spin/>}
          <Row className='py-5 justify-content-center'>
            <Col lg={5} md={5}>
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
                  controlId='floatingEmail'
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
                    placeholder='Password'
                    {...register('password', {
                      required: true,
                      minLength: 6,
                    })}
                  />
                  <p className='text-start text-danger'>
                    {' '}
                    {errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length should be more than 5'
                        : 'Password is required'
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
                      minLength: 6,
                    })}
                  />
                  <p className='text-start text-danger'>
                    {' '}
                    {errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Confirm Password length should be more than 5'
                        : 'Confirm Password is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <div className='mb-4 text-center'>
                  <Button
                    type='submit'
                    variant='info'
                    size='lg'
                    className='shadow'
                  >
                    <i className='bi bi-lock-fill bicart mx-2'></i> Create new
                    account
                  </Button>
                  <ToastContainer />
                </div>
              </Form>

              <Link href={`/login?redirect=${redirect || '/'}`} passHref>
                <p className='text-info text-center' type='button'>
                  Back to login
                </p>
              </Link>
            </Col>
          </Row>
        </div>
      </>
    </div>
  )
}
Register.Layout = Layout
