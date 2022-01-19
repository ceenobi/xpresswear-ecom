import React, { useContext } from 'react'
import {Button, Stack, Container} from 'react-bootstrap'
import Link from 'next/link'
import { Store } from '../utils/store'
import axios from 'axios'
import Image from 'next/image'
// import { useRouter } from 'next/router'

export default function ProductCard({ product }) {
  // const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock.')
      return
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
  }
  return (
    <>
      <Container>
        <Container style={{ backgroundColor: '#f2f2f4' }}>
          <Link href={`/shop/products/${product.slug}`} passHref>
            <Image
              blurDataURL={product.image}
              src={product.image}
              title={product.name}
              width='500px'
              height='600px'
            />
          </Link>
        </Container>
        <p className='mt-3'>{product.name}</p>
        <Stack direction='horizontal' gap={1}>
          &#x24;<small className='fw-bold'>{product.price}</small>
          <Button
            variant='none'
            className='ms-auto'
            onClick={() => addToCartHandler(product)}
          >
            <i className='bi bi-cart-fill bicart'></i>
          </Button>
        </Stack>
      </Container>
    </>
  )
}
