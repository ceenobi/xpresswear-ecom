import React, { useContext } from 'react'
import { Store } from '../utils/store'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import MyLayout from '../components/MyLayout'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NoCart from '../components/NoCart'
import PreFooter from '../components/PreFooter'
import Check from '../public/check-mark-svgrepo-com.svg'
import Close from '../public/close-svgrepo-com.svg'

export default function Cart() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock.')
      return
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }
  const checkoutHandler = () => {
    router.push('/shipping')
  }

  const decision = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)

  return (
    <div className='mt-md-5'>
      <Head>
        <title>Shopping cart</title>
      </Head>
      {cartItems.length === 0 ? (
        <NoCart />
      ) : (
        <>
          <Container>
            <h1 className='mt-2 text-md-start text-center'>Cart</h1>
          </Container>
          <div className='py-5 px-4 main-bg'>
            <Container>
              <p className='mb-0 p-2 fw-bold lead text-info'>
                Your items: ({cartItems.reduce((a, c) => a + c.quantity, 0)})
              </p>
            </Container>
            {cartItems.map((item) => (
              <Row className='justify-content-center' key={item._id}>
                <Col
                  lg={6}
                  md={6}
                  xs={12}
                  className='mb-4 mb-md-0'
                  style={{ background: '#080808' }}
                >
                  <div className='d-flex'>
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
                        <p className='mb-0 fw-bold'> {item.name}</p>
                      </Link>
                      <p className='mb-0'>{item.title}</p>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4} xs={12} style={{ background: '#111111' }}>
                  <div className='d-flex justify-content-evenly'>
                    <div className='d-flex mt-md-4'>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                        className='mx-3 align-self-center'
                      >
                        {' '}
                        value={item.quantity}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <div
                        className='vr align-self-center'
                        style={{
                          height: '30px',
                          border: '2px solid white',
                        }}
                      ></div>
                      <i
                        className='bi bi-trash mx-3 align-self-center'
                        type='button'
                        onClick={() => removeItemHandler(item)}
                      ></i>
                    </div>
                    <div className='mt-2 mt-md-5'>
                      <p className='fw-bold align-self-center cart-text'>
                        &#x24;{item.price}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            ))}

            <Row className=' mt-4 mb-4 justify-content-center'>
              <Col
                lg={8}
                xs={8}
                md={8}
                style={{
                  borderBottom: '8px solid #17a2b8',
                  background: '#080808',
                }}
              >
                <p className='lead mt-2 align-self-center cart-title size'>
                  Subtotal:
                </p>
              </Col>
              <Col
                lg={2}
                xs={4}
                md={2}
                style={{
                  borderBottom: '8px solid #17a2b8',
                  background: '#080808',
                }}
              >
                <p className='fw-bold text-md-center align-self-center mt-2 cart-text'>
                  &#x24;
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>
              </Col>
            </Row>
            <Row className='mb-4 justify-content-center'>
              <Col lg={8} xs={8} md={8} style={{ background: '#080808' }}>
                <div className='d-flex'>
                  <p className='lead py-2 cart-title mt-2 size'>
                    Estimated Shipping:
                  </p>
                  {decision > 200 ? (
                    <Image
                      src={Check}
                      width={40}
                      height={30}
                      alt='checkmark'
                      className='px-2'
                    />
                  ) : (
                    <Image
                      src={Close}
                      width={40}
                      height={30}
                      alt='close'
                      className='px-2'
                    />
                  )}
                </div>
              </Col>
              <Col lg={2} xs={4} md={2} style={{ background: '#080808' }}>
                <div className='fw-bold text-md-center py-2 cart-text'>
                  {decision > 400 ? (
                    <p className='mt-2'>FREE</p>
                  ) : (
                    <p className='mt-2'>&#x24;3</p>
                  )}
                </div>
              </Col>

              <Col lg={8} xs={8} md={8} style={{ background: '#080808' }}>
                <p className='text-md-start lead cart-title size'>Total:</p>
              </Col>
              <Col lg={2} xs={4} md={2} style={{ background: '#080808' }}>
                <p className='fw-bold text-md-center cart-text'>
                  &#x24;
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>
              </Col>
            </Row>
            <Row className='mb-4 mt-5 justify-content-center'>
              <Col lg={6}>
                <div className='mb-4 text-center'>
                  <Button
                    variant='info'
                    onClick={checkoutHandler}
                    size='lg'
                    className='fw-bold shadow'
                  >
                    Checkout
                    <i className='bi bi-chevron-right text-dark mx-2'></i>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <PreFooter />
        </>
      )}
    </div>
  )
}
Cart.Layout = MyLayout
