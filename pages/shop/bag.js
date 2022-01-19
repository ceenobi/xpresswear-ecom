import React from 'react'
import db from '../../utils/db'
import Product from '../../models/Product'
import ProductCard from '../../components/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Head from 'next/head'

export default function Bag({ bags }) {
  return (
    <div className='mt-md-5'>
      <Head>
        <title>Bag page</title>
      </Head>
      <>
        <Container>
          <h1 className='mt-2 text-md-start text-center'>Bag</h1>
        </Container>
        <div className='py-5 px-4 main-bg'>
          <Row className='mx-lg-1'>
            {bags.map((product) => (
              <Col
                xs={6}
                sm={6}
                md={4}
                lg={4}
                className='mb-3 px-1'
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

Bag.Layout = Layout

export async function getServerSideProps() {
  await db.connect()
  const bags = await Product.find({ category: 'Bag' }, '-reviews').lean()
  await db.disconnect()

  return {
    props: {
      bags: bags.map(db.convertDocToObject),
    },
  }
}
