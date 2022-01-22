import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../utils/store'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import MyLayout from '../../components/MyLayout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { getError } from '../../utils/error'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import PreFooter from '../../components/PreFooter'
import Spin from '../../components/Spinner'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true }
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true }
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' }
    default:
      state
  }
}

export default function Order({ params }) {
  const orderId = params.id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const router = useRouter()
  const { state } = useContext(Store)
  const { userInfo } = state

  const [{ loading, error, order, successPay }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: '',
    }
  )
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order
  useEffect(() => {
    if (!userInfo) {
      return router.push('/login')
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH FAIL', payload: getError(err) })
      }
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder()
      if (successPay) {
        dispatch({ type: 'PAY_RESET' })
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId, currency: 'USD' },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPaypalScript()
    }
  }, [order, successPay])

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID
      })
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' })
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        )
        dispatch({ type: 'PAY_SUCCESS', payload: data })
        toast.success('Order is paid', {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
        })
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        toast.error(getError(err), {
          position: toast.POSITION.TOP_CENTER,
          transition: Slide,
        })
      }
    })
  }

  function onError(err) {
    toast.error(getError(err), {
      position: toast.POSITION.TOP_CENTER,
      transition: Slide,
    })
  }

  return (
    <div className='mt-md-5'>
      <Head>
        <title>{`Order ${orderId}`}</title>
      </Head>
      <>
        <div>
          <ToastContainer />
          <Container>
            <h1 className='mt-2 text-md-start text-center'>Order summary</h1>
          </Container>
          {loading ? (
            <Spin />
          ) : error ? (
            <Container>
              <h6 className='mt-2 text-md-start text-center'>{error}</h6>
            </Container>
          ) : (
            <div className='py-5 px-4 main-bg'>
              <Container>
                <p className='mb-0 p-2 fw-bold lead text-info'>
                  Order id: <small>{orderId}</small>
                </p>
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

                <Col lg={6} md={6} style={{ background: '#080808' }}>
                  <p className='py-2 cart-title'>Payment Status:</p>
                </Col>
                <Col lg={3} md={3} style={{ background: '#111111' }}>
                  <p className='fw-bold text-md-center py-2 cart-text'>
                    {isPaid ? `paid ${paidAt}` : 'not paid'}
                  </p>
                </Col>
                <Col lg={6} md={6} style={{ background: '#080808' }}>
                  <p className='py-2 cart-title'>Delivery Status:</p>
                </Col>
                <Col lg={3} md={3} style={{ background: '#111111' }}>
                  <p className='fw-bold text-md-center py-2 cart-text'>
                    {isDelivered ? `delivered ${deliveredAt}` : 'not delivered'}
                  </p>
                </Col>
              </Row>
              {orderItems.map((item) => (
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
                        <p>Qty: {item.quantity}</p>
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
                  <p className='py-2 lead cart-title'>Item:</p>
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
                <Col lg={3} md={4}>
                  <div className='mb-4 text-center'>
                    {!isPaid && (
                      <div>
                        {isPending ? (
                          <Spin/>
                        ) : (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          )}
          <PreFooter />
        </div>
      </>
    </div>
  )
}
export async function getServerSideProps({ params }) {
  return {
    props: { params },
  }
}

Order.Layout = MyLayout
