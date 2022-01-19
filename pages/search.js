import React from 'react'
import { useRouter } from 'next/router'
import {Store} from '../utils/store'
import db from '../utils/db'
import Layout from '../components/Layout'
import Product from '../models/Product'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import {Row, Col, Container, Button} from 'react-bootstrap'
import Rating from '@material-ui/lab/Rating';
import { Pagination } from '@material-ui/lab';
import Head from 'next/head'
import {AiOutlineClose} from 'react-icons/ai'

const PAGE_SIZE = 3;
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];
const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
     const router = useRouter();
     const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query;
   const { products, countProducts, categories, brands, pages } = props;
   const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };
   const { state, dispatch } = useContext(Store);
    
   const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
    return (
      <div>
        <Head>
          <title>Search</title>
        </Head>
        <Container>
          <Row>
            <Col>
              <p>Categories</p>
              <select value={category} onChange={categoryHandler}>
                <option value='all'>All</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <p>Brand</p>
              <select value={brand} onChange={brandHandler}>
                <option value='all'>All</option>
                {brands &&
                  brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
            </Col>
            <Col>
              <p>Prices</p>
              <select value={price} onChange={priceHandler}>
                <option value='all'>All</option>
                {prices.map((price) => (
                  <option key={price.value} value={price.value}>
                    {price.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <p>Ratings</p>
              <select value={rating} onChange={ratingHandler}>
                <option value='all'>All</option>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    <Rating value={rating} readOnly />
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Container>
            <Row>
              <Col lg={4} md={6} xs={6} className='mb-3 px-3'>
                {products.length === 0 ? 'No' : countProducts} Results
                {query !== 'all' && query !== '' && ' : ' + query}
                {category !== 'all' && ' : ' + category}
                {brand !== 'all' && ' : ' + brand}
                {price !== 'all' && ' : Price ' + price}
                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                {(query !== 'all' && query !== '') ||
                category !== 'all' ||
                brand !== 'all' ||
                rating !== 'all' ||
                price !== 'all' ? (
                  <Button onClick={() => router.push('/search')}>
                    <AiOutlineClose />
                  </Button>
                ) : null}
              </Col>
              <Col>
                <p>Sort by</p>
                <select value={sort} onChange={sortHandler}>
                  <option value='featured'>Featured</option>
                  <option value='lowest'>Price: Low to High</option>
                  <option value='highest'>Price: High to Low</option>
                  <option value='toprated'>Customer Reviews</option>
                  <option value='newest'>Newest Arrivals</option>
                </select>
              </Col>
            </Row>
            <Row className='mx-lg-1'>
              {products.map((product) => (
                <Col
                  lg={4}
                  md={6}
                  xs={6}
                  className='mb-3 px-3'
                  key={product.name}
                >
                  <ProductCard
                    product={product}
                    addToCartHandler={addToCartHandler}
                  />
                </Col>
              ))}
            </Row>
            <Pagination
              defaultPage={parseInt(query.page || '1')}
              count={pages}
              onChange={pageHandler}
            ></Pagination>
          </Container>
        </Container>
      </div>
    )
}

Search.Layout = Layout

export async function getServerSideProps({ query }) {
  await db.connect()
  const pageSize = query.pageSize || PAGE_SIZE
  const page = query.page || 1
  const category = query.category || ''
  const brand = query.brand || ''
  const price = query.price || ''
  const rating = query.rating || ''
  const sort = query.sort || ''
  const searchQuery = query.query || ''

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 }

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  ).sort(order).skip(pageSize * (page - 1)).limit(pageSize)
.lean()

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  // const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      productDocs : productDocs.map(db.convertDocToObj),
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  }
}