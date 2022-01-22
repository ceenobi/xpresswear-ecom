import React, { useContext, useState, useEffect } from 'react'
import db from '../../../utils/db'
import axios from 'axios'
import Product from '../../../models/Product'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Stack,
} from 'react-bootstrap'
import styled from 'styled-components'
import { Store } from '../../../utils/store'
import { useRouter } from 'next/router'
import { getError } from '../../../utils/error'
import AccordionView from '../../../components/Accordion'
import Rating from '@material-ui/lab/Rating'
import { ToastContainer, toast, Slide } from 'react-toastify'
import Spin from '../../../components/Spinner'

export default function ProductInfo({product}) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      setLoading(false)
      toast.success('Review sumitted successfully', {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
      fetchReviews()
    } catch (err) {
      setLoading(false)
      toast.error(getError(err), {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
    }
  }

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`)
      setReviews(data)
    } catch (err) {
      toast.error(getError(err), {
        position: toast.POSITION.TOP_CENTER,
        transition: Slide,
      })
    }
  }

 useEffect(() => {
   fetchReviews()
 }, [])


  if (!product) {
    return (
      <Container className='text-center'>
        <h1>Oops...Product not found!</h1>
      </Container>
    )
  }
   const addToCartHandler = async () => {
     const existItem = state.cart.cartItems.find((x) => x._id === product._id)
     const quantity = existItem ? existItem.quantity + 1 : 1
     const { data } = await axios.get(`/api/products/${product._id}`)
     if (data.countInStock < quantity) {
       window.alert('Sorry. Product is out of stock.')
       return
     }
     dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
     router.push('/cart')
   }

  return (
    <ProductWrap>
      <Head>
        <title>
          {product.name} {product.title}
        </title>
      </Head>
      {/* display single product */}
      <div>
        <ToastContainer />
        <Row className='justify-content-center'>
          <Col lg={6} md={6}>
            <div className='mt-5 px-4'>
              <div className='px-3' style={{ backgroundColor: 'white' }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <div className='d-flex py-3 px-4 justify-content-evenly'>
              <div className='px-2'>
                <Image
                  src={product.imageB}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </div>
              <div style={{ backgroundColor: '#e8e8e8' }}>
                <Image
                  src={product.imageA}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} className='cart-bg'>
            <div className='mt-5 mt-lg-0 mb-4 px-3 border-bottom'>
              <div className='mt-5'>
                <h4 className='text-uppercase fw-bold'>{product.title}</h4>
                <h6>{product.brand}</h6>
                <h6>{product.category}</h6>

                <div className='d-flex'>
                  <Rating value={product.rating} readOnly></Rating>
                  <Link href='#reviews' passHref>
                    <p type='button'>({product.numReview} reviews)</p>
                  </Link>
                </div>

                {product.countInStock > 0 ? (
                  <p>
                    <small>AVAILABLE</small>
                  </p>
                ) : (
                  <p>
                    <small>OUT OF STOCK</small>
                  </p>
                )}
              </div>
            </div>
            <AccordionView product={product} />
            <Container className='mt-5 mb-4'>
              <div className='d-flex justify-content-between '>
                <p className='mb-2 fw-bold lead fs-4 align-self-center'>
                  &#x24;{product.price}
                </p>
                <div className=' mb-2'>
                  {product.countInStock > 0 ? (
                    <Button
                      variant='info'
                      size='lg'
                      onClick={addToCartHandler}
                      className='fw-bold shadow'
                    >
                      <i className='bi bi-cart-fill text-dark'></i>{' '}
                      <small>ADD TO CART</small>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant='warning'
                      size='lg'
                      className='fw-bold shadow'
                    >
                      <i className='bi bi-cart-fill text-dark'></i>{' '}
                      <small>OUT OF STOCK</small>
                    </Button>
                  )}
                </div>
              </div>
              {product.price > 400 ? (
                <p> *This item is eligible for free shipping.</p>
              ) : (
                <p> *Additional shipping fee is added at checkout.</p>
              )}
            </Container>
          </Col>
        </Row>
        {/* user comment */}
        <Row className='justify-content-center py-4'>
          <Container className='text-center mt-4 mb-4' id='reviews'>
            <h4>Customer Reviews</h4>
          </Container>
          <Col lg={6} md={6}>
            {reviews.length === 0 && (
              <Container className='mt-2'>
                <p>No reviews</p>
              </Container>
            )}
            {reviews.map((review) => (
              <Container key={review._id}>
                <p>
                  {' '}
                  <strong>{review.name}</strong>
                </p>
                <p>{review.createdAt.substring(0, 10)}</p>
                <div>
                  <Rating value={review.rating} readOnly></Rating>
                  <p>{review.comment}</p>
                </div>
              </Container>
            ))}
          </Col>
          <Col lg={4} md={6}>
            {userInfo ? (
              <Form onSubmit={submitHandler} className='border py-4 px-3'>
                <p>Leave a review</p>
                <FloatingLabel
                  controlId='floatingTextarea'
                  label='Enter Comments'
                  className='mb-3'
                >
                  <Form.Control
                    as='textarea'
                    placeholder='Leave a comment here'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FloatingLabel>
                <Stack gap={2} className='col-md-5 mx-auto'>
                  <Rating
                    name='simple-controlled'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <Button
                    type='submit'
                    className='shadow fw-bold'
                    variant='info'
                  >
                    Submit
                  </Button>
                  {loading && <Spin />}
                </Stack>
              </Form>
            ) : (
              <h4>
                Please{' '}
                <Link href={`/login?redirect=shop/products/${product.slug}`}>
                  login
                </Link>{' '}
                to write a review
              </h4>
            )}
          </Col>
        </Row>
      </div>
    </ProductWrap>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params
  await db.connect()
  const product = await Product.findOne({ slug }, '-reviews').lean()
  await db.disconnect()

  return {
    props: {
      product: db.convertDocToObject(product),
    },
  }
}
ProductInfo.Layout = Layout

const ProductWrap = styled.div`
  @media (max-width: 758px) {
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 990px) {
    h3 {
      font-size: 25px;
    }
  } ;
`
