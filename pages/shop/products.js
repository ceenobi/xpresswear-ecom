import React from 'react'
import db from '../../utils/db'
import Product from '../../models/Product'
import ProductCard from '../../components/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Head from 'next/head'

export default function Products({ products }) {
  return (
    <div className='mt-md-5'>
      <Head>
        <title>Product page</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Shop</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Row className='mx-lg-1'>
            {products.map((product) => (
              <Col
                lg={4}
                md={6}
                xs={6}
                className='mb-3 px-3'
                key={product.name}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </>
    </div>
  )
}

Products.Layout = Layout

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}, '-reviews').lean()
  
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocToObject),
    },
  }
}
