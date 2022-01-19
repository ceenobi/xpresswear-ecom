import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/store'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MyLayout from '../components/MyLayout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import Cookies from 'js-cookie'
import CheckoutWizard from '../components/CheckoutWizard'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { getError } from '../utils/error'
import Spinner from '../components/Spinner'
import PreFooter from '../components/PreFooter'

export default function Placeorder() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  )
  const shippingPrice = itemsPrice > 400 ? 0 : 3
  const taxPrice = round2(itemsPrice * 0.015)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')
    }
    if (cartItems.length === 0) {
      router.push('/cart')
    }
  }, [])

  const [loading, setLoading] = useState(false)
  const placeOrderHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      dispatch({ type: 'CART_CLEAR' })
      Cookies.remove('cartItems')
      setLoading(false)
      router.push(`/order/${data._id}`)
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
        <title>Order details</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Shipping</h1>
          <ToastContainer />
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Row className='py-3 justify-content-center'>
            <Col lg={9} md={10}>
              <CheckoutWizard currentStep={3} />
            </Col>
          </Row>
          <Container>
            <p className='mb-0 p-2 fw-bold lead text-info'>Order details:</p>
          </Container>
          <Row className='justify-content-center'>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>Name:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 align-self-center cart-text'>
                {shippingAddress.fullName}
              </p>
            </Col>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>Address:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 cart-text'>
                {shippingAddress.address}
              </p>
            </Col>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>City:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 cart-text'>
                {shippingAddress.city}
              </p>
            </Col>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>State:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 cart-text'>
                {shippingAddress.state}
              </p>
            </Col>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>Zip/Postal code:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 cart-text'>
                {shippingAddress.postalCode}
              </p>
            </Col>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>Country:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 cart-text'>
                {shippingAddress.country}
              </p>
            </Col>
            <Col lg={6} md={6} style={{ background: '#080808' }}>
              <p className='py-2 cart-title'>Payment method:</p>
            </Col>
            <Col lg={3} md={3} style={{ background: '#111111' }}>
              <p className='fw-bold text-md-center py-2 cart-text'>
                {paymentMethod}
              </p>
            </Col>
          </Row>

          {cartItems.map((item) => (
            <div key={item._id}>
              <Row className='py-3 justify-content-center'>
                <Col lg={6} md={6} style={{ background: '#080808' }}>
                  <div className='d-flex py-2'>
                    <Link href={`/shop/products/${item.slug}`} passHref>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={112}
                      />
                    </Link>
                    <div className='d-md-flex flex-column align-self-center cart-text'>
                      <Link href={`/shop/products/${item.slug}`} passHref>
                        <p className='mb-0'>{item.name}</p>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={3} style={{ background: '#111111' }}>
                  <div className='d-flex justify-content-evenly mt-2 mt-md-5 cart-text'>
                    <p>Qty:{item.quantity}</p>
                    <p className='fw-bold'>&#x24;{item.price}</p>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
          <Row className=' mt-4 mb-4 justify-content-center'>
            <Col
              lg={7}
              md={7}
              xs={6}
              style={{
                background: '#080808',
                borderBottom: '8px solid #17a2b8',
              }}
            >
              <p className='py-2 lead cart-title'>Subtotal:</p>
            </Col>
            <Col
              lg={2}
              md={2}
              xs={6}
              style={{
                background: '#080808',
                borderBottom: '8px solid #17a2b8',
              }}
            >
              <p className='fw-bold text-end text-md-center py-2 cart-text'>
                &#x24;{itemsPrice}
              </p>
            </Col>
          </Row>
          <Row className=' mt-4 mb-4 justify-content-center'>
            <Col lg={7} md={7} xs={6} style={{ background: '#080808' }}>
              <p className='py-2 lead cart-title'>Tax:</p>
            </Col>
            <Col lg={2} md={2} xs={6} style={{ background: '#080808' }}>
              <p className='fw-bold text-end text-md-center py-2 cart-text'>
                &#x24;{taxPrice}
              </p>
            </Col>
            <Col lg={7} md={7} xs={6} style={{ background: '#080808' }}>
              <p className='py-2 lead cart-title'>Shipping:</p>
            </Col>
            <Col lg={2} md={2} xs={6} style={{ background: '#080808' }}>
              <p className='fw-bold text-end text-md-center py-2 cart-text'>
                &#x24;{shippingPrice}
              </p>
            </Col>
          </Row>

          <Row className=' mt-4 mb-4 justify-content-center'>
            <Col lg={7} md={7} xs={6} style={{ background: '#080808' }}>
              <p className='py-2 lead cart-title'>Total:</p>
            </Col>
            <Col lg={2} md={2} xs={6} style={{ background: '#080808' }}>
              <p className='fw-bold text-end text-md-center py-2 cart-text'>
                &#x24;{totalPrice}
              </p>
            </Col>
          </Row>
          <Row className='mb-4 mt-5 justify-content-center'>
            <Col lg={6}>
              <div className='mb-4 text-center'>
                <Button
                  variant='info'
                  size='lg'
                  className='fw-bold shadow'
                  onClick={placeOrderHandler}
                >
                  Place order
                  <i className='bi bi-chevron-right text-dark mx-2'></i>
                </Button>
              </div>
            </Col>
            {loading && <Spinner />}
          </Row>
        </div>
        <PreFooter />
      </>
    </div>
  )
}
Placeorder.Layout = MyLayout

