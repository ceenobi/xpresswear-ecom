import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getError } from '../../utils/error'
import { Store } from '../../utils/store'
import { ToastContainer, toast, Slide } from 'react-toastify'
import Spin from '../../components/Spinner'
import Head from 'next/head'
import { Container, Row, Col, Card, ListGroup, Table, Button } from 'react-bootstrap'
import Layout from '../../components/Layout'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true }
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false }
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false }
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true }
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false }
    default:
      state
  }
}

export default function AdminProducts() {
  const { state } = useContext(Store)
  const router = useRouter()
  const { userInfo } = state

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  })


  useEffect(() => {
    if (!userInfo) {
      router.push('/login')
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/products`, {
          headers: { authorization: `Bearer ${productInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' })
    } else {
      fetchData()
    }
  }, [successDelete])
const createHandler = async () => {
  if (!window.confirm('Are you sure?')) {
    return
  }
  try {
    dispatch({ type: 'CREATE_REQUEST' })
    const { data } = await axios.post(
      `/api/admin/products`,
      {},
      {
        headers: { authorization: `Bearer ${productInfo.token}` },
      }
    )
    dispatch({ type: 'CREATE_SUCCESS' })
  toast.success('Product created successfully', {
    position: toast.POSITION.TOP_CENTER,
    transition: Slide,
  })
    router.push(`/admin/product/${data.product._id}`)
  } catch (err) {
    dispatch({ type: 'CREATE_FAIL' })
 toast.error(getError(err), {
   position: toast.POSITION.TOP_CENTER,
   transition: Slide,
 })
  }
}
const deleteHandler = async (productId) => {
  if (!window.confirm('Are you sure?')) {
    return
  }
  try {
    dispatch({ type: 'DELETE_REQUEST' })
    await axios.delete(`/api/admin/products/${productId}`, {
      headers: { authorization: `Bearer ${productInfo.token}` },
    })
    dispatch({ type: 'DELETE_SUCCESS' })
toast.success('Product deleted successfully', {
  position: toast.POSITION.TOP_CENTER,
  transition: Slide,
})
  } catch (err) {
    dispatch({ type: 'DELETE_FAIL' })
toast.error(getError(err), {
  position: toast.POSITION.TOP_CENTER,
  transition: Slide,
})
  }
}
  return (
    <div className='mt-md-5'>
      <Head>
        <title>Products</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Shipping</h1>
          <ToastContainer />
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Row className='py-5 justify-content-center'>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Header>Featured</Card.Header>
                <ListGroup variant='flush'>
                  <Link href='/admin/dashboard' passHref>
                    <ListGroup.Item>Admin Dashboard</ListGroup.Item>
                  </Link>
                  <Link href='/admin/orders' passHref>
                    <ListGroup.Item>Orders</ListGroup.Item>
                  </Link>
                  <Link href='/admin/products' passHref>
                    <ListGroup.Item>Products</ListGroup.Item>
                  </Link>
                  <Link href='/admin/products' passHref>
                    <ListGroup.Item>products</ListGroup.Item>
                  </Link>
                </ListGroup>
              </Card>
              <Card style={{ width: '18rem' }}>
                <Card.Header>Products</Card.Header>
                <ListGroup variant='flush'>
                  <ListGroup.Item> {loadingDelete && <Spin />}</ListGroup.Item>
                  <Button onClick={createHandler} variant='info'>
                    Create
                  </Button>
                  {loadingCreate && <Spin />}
                </ListGroup>
              </Card>
            </Col>
            <Col lg={6}>
              <ListGroup>
                {loading ? (
                  <Spin />
                ) : error ? (
                  <h3>{error}</h3>
                ) : (
                  <ListGroup.Item>
                    <Table striped bordered hover responsive variant='dark'>
                      <thead className='cart-text'>
                        <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>CATEGORY</th>
                          <th>COUNT</th>
                          <th>RATING</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <>
                            <tr key={product._id}>
                              <td>{product._id.substring(20, 24)}</td>
                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>{product.category}</td>
                              <td>{product.countInStock}</td>
                              <td>{product.rating}</td>
                              <td>
                                <Link
                                  href={`/admin/product/${product._id}`}
                                  passHref
                                >
                                  <Button variant='info' className='shadow'>
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => deleteHandler(product._id)}
                                    size='sm'
                                    variant='primary'
                                  >
                                    Delete
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </>
    </div>
  )
}
AdminProducts.Layout = Layout
