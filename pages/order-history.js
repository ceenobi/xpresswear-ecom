import React, { useEffect, useContext, useReducer } from 'react'
import { useRouter } from 'next/router'
import {Store} from '../utils/store'
import {getError} from '../utils/error'
import axios from 'axios'
import Spinner from '../components/Spinner'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import { Container, Row, Col, Table, Button, ListGroup, Tab} from 'react-bootstrap'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}

export default function OrderHistory() {
    const router = useRouter()
  const { state } = useContext(Store)
  const { userInfo } = state

  const [{ loading, error, orders }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      orders: [],
      error: '',
    }
  )

  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchOrders()
  }, [])
  return (
    <div className='mt-md-5'>
      <Head>
        <title>Order History</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Dashboard</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Container>
            <Tab.Container
              id='list-group-tabs-example'
              defaultActiveKey='#link2'
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
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey='#link1'>hello</Tab.Pane>
                    {loading ? (
                      <Spinner />
                    ) : error ? (
                      <h6>{error}</h6>
                    ) : (
                      <Tab.Pane eventKey='#link2'>
                        <Table striped bordered hover responsive variant='dark'>
                          <thead className='cart-text'>
                            <tr>
                              <th>ID</th>
                              <th>DATE</th>
                              <th>TOTAL</th>
                              <th>PAID</th>
                              <th>DELIVERED</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <>
                                <tr key={order._id}>
                                  <td>{order._id.substring(20, 24)}</td>
                                  <td>{order.createdAt}</td>
                                  <td>&#x24;{order.totalPrice}</td>
                                  <td>
                                    {' '}
                                    {order.isPaid
                                      ? `paid at ${order.paidAt}`
                                      : 'not paid'}
                                  </td>
                                  <td>
                                    {order.isDelivered
                                      ? `delivered at ${order.deliveredAt}`
                                      : 'not delivered'}
                                  </td>
                                  <td>
                                    <Link href={`/order/${order._id}`} passHref>
                                      <Button variant='primary'>DETAILS</Button>
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </Table>
                      </Tab.Pane>
                    )}
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
OrderHistory.Layout = Layout