import React, { useContext, useEffect } from 'react'
import {
  Button,
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import Head from 'next/head'
import MyLayout from '../components/MyLayout'
import { Store } from '../utils/store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'

export default function Shipping() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm()
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { shippingAddress },
  } = state

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping')
    }
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('state', shippingAddress.state)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [])

  const submitHandler = ({ fullName, address, city, state, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, state, postalCode, country },
    })
    Cookies.set('shippingAddress', JSON.stringify({
      fullName,
      address,
      city,
      state,
      postalCode,
      country,
    }))
    router.push('/payment')
  }

  return (
    <div className='mt-md-5'>
      <Head>
        <title>Shipping info</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Shipping</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Row className='py-3 justify-content-center'>
            <Col lg={6} md={6}>
              <CheckoutWizard currentStep={1} />
            </Col>
          </Row>
          <Row className='py-3 justify-content-center'>
            <Col md={6} lg={4}>
              <Form
                onSubmit={handleSubmit(submitHandler)}
                className='mt-4 mt-md-0'
              >
                <FloatingLabel
                  controlId='fullName'
                  label='Full Name'
                  className='mb-4'
                >
                  <Form.Control
                    type='text'
                    placeholder='full name'
                    {...register('fullName', {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <p className='text-start'>
                    {errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name should be more than 1'
                        : 'Full Name is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <FloatingLabel
                  controlId='address'
                  label='Address'
                  className='mb-4'
                >
                  <Form.Control
                    type='text'
                    placeholder='address'
                    {...register('address', {
                      required: true,
                      minLength: 5,
                    })}
                  />
                  <p className='text-start'>
                    {errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address should be more than 4'
                        : 'Address is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <FloatingLabel controlId='city' label='City' className='mb-4'>
                  <Form.Control
                    type='text'
                    placeholder='city'
                    {...register('city', {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <p className='text-start'>
                    {errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City should be more than 1'
                        : 'City is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <FloatingLabel controlId='state' label='State' className='mb-4'>
                  <Form.Control
                    type='text'
                    placeholder='state'
                    {...register('state', {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <p className='text-start'>
                    {errors.state
                      ? errors.state.type === 'minLength'
                        ? 'State should be more than 1'
                        : 'State is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <FloatingLabel
                  controlId='postalCode'
                  label='zip code'
                  className='mb-4'
                >
                  <Form.Control
                    type='text'
                    placeholder='zip'
                    {...register('postalCode', {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <p className='text-start'>
                    {errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code should be more than 1'
                        : 'Postal Code is required'
                      : ''}
                  </p>
                </FloatingLabel>
                <FloatingLabel
                  controlId='country'
                  label='Country'
                  className='mb-4'
                >
                  <Form.Control
                    type='text'
                    placeholder='country'
                    {...register('country', {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <p className='text-start'>
                    {errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country should be more than 1'
                        : 'Country is required'
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
                    Continue
                    <i className='bi bi-chevron-right text-dark mx-2'></i>
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    </div>
  )
}

Shipping.Layout = MyLayout
