import React,{useEffect, useContext, useState} from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import MyLayout from '../components/MyLayout'
import { Store } from '../utils/store'
import {useRouter} from 'next/router'
import CheckoutWizard from '../components/CheckoutWizard'
import {Container, Form, Button, Row, Col, Stack} from 'react-bootstrap'
import { ToastContainer, toast, Slide } from 'react-toastify'
import PreFooter from '../components/PreFooter'

export default function Payment() {
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState('');
    const {state, dispatch} = useContext(Store);
    const {cart: {shippingAddress}} = state
    
    useEffect(()=> {
        if(!shippingAddress.address) {
            router.push('/shipping')
        } else {
            setPaymentMethod(Cookies.get('paymentMethod') || '')
        }
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        if(!paymentMethod) {
        toast.error("Payment Method is required", {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
        })
        } else {
          dispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod})
          Cookies.set('paymentMethod', paymentMethod)
          router.push('/placeorder')
        }
    }
    return (
      <div className='mt-md-5'>
        <Head>
          <title>Payment Method</title>
        </Head>
        <>
          <Container>
            <h1 className='mt-2 text-md-start text-center'>Payment method</h1>
          </Container>
          <div className='py-5 px-4 main-bg'>
            <Row className='py-3 justify-content-center'>
              <Col lg={6} md={6}>
                <CheckoutWizard currentStep={2} />
              </Col>
            </Row>
            <Row className='py-3 justify-content-center'>
              <Col md={6} lg={4}>
                <Form onSubmit={submitHandler} className='mt-4 mt-md-0'>
                  {['radio'].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className='mb-3'
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <Form.Check
                        inline
                        label='PayPal'
                        name='group1'
                        value='PayPal'
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label='Stripe'
                        name='group1'
                        value='Stripe'
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label='Cash'
                        name='group1'
                        value='Cash'
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                  <Stack gap={2} className='col-md-6'>
                    <div className='d-grid gap-2'>
                      <Button
                        type='submit'
                        variant='info'
                        size='lg'
                        className='shadow fw-bold'
                      >
                        Continue
                        <i className='bi bi-chevron-right text-dark mx-2'></i>
                      </Button>
                      <p
                        className='text-info fw-bold text-center'
                        type='button'
                        onClick={() => router.push('/shipping')}
                      >
                        Back
                      </p>
                      <ToastContainer />
                    </div>
                  </Stack>
                </Form>
              </Col>
            </Row>
          </div>
          <PreFooter />
        </>
      </div>
    )
}
Payment.Layout = MyLayout

