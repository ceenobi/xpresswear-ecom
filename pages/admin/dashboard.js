// import React, { useEffect, useContext, useReducer } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import { getError } from '../../utils/error'
// import { Store } from '../../utils/store'
// import Head from 'next/head'
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   ListGroup,
//   Button,
// } from 'react-bootstrap'
// import Layout from '../../components/Layout'
// import { Bar } from 'react-chartjs-2'
// import Spin from '../../components/Spinner'

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' }
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, summary: action.payload, error: '' }
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload }
//     default:
//       state
//   }
// }

// export default function Admindashboard() {
//   const { state } = useContext(Store)
//   const router = useRouter()
//   const { userInfo } = state
//   const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
//     loading: true,
//     summary: { salesData: [] },
//     error: '',
//   })

//   useEffect(() => {
//     if (!userInfo) {
//       router.push('/login')
//     }
//     const fetchData = async () => {
//       try {
//         dispatch({ type: 'FETCH_REQUEST' })
//         const { data } = await axios.get(`/api/admin/summary`, {
//           headers: { authorization: `Bearer ${userInfo.token}` },
//         })
//         dispatch({ type: 'FETCH_SUCCESS', payload: data })
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
//       }
//     }
//     fetchData()
//   }, [])
//   return (
//     <div className='mt-md-5'>
//       <Head>
//         <title>Admin Dashboard</title>
//       </Head>
//       <>
//         <Container>
//           <h1 className='mt-2 text-md-start text-center'>Admin Dshboard</h1>
//         </Container>
//         <div className='py-5 px-4 main-bg'>
//           <Row className='py-5 justify-content-center'>
//             <Col lg={4}>
//               <Card style={{ width: '18rem' }}>
//                 <Card.Header>Featured</Card.Header>
//                 <ListGroup variant='flush'>
//                   <Link href='/admin/dashboard' passHref>
//                     <ListGroup.Item>Admin Dashboard</ListGroup.Item>
//                   </Link>
//                   <Link href='/admin/orders' passHref>
//                     <ListGroup.Item>Orders</ListGroup.Item>
//                   </Link>
//                   <Link href='/admin/products' passHref>
//                     <ListGroup.Item>Products</ListGroup.Item>
//                   </Link>
//                   <Link href='/admin/users' passHref>
//                     <ListGroup.Item>Users</ListGroup.Item>
//                   </Link>
//                 </ListGroup>
//               </Card>
//             </Col>
//             <Col lg={6}>
//               <Card>
//                 <ListGroup variant='flush'>
//                   <ListGroup.Item>
//                     {loading ? (
//                       <Spin />
//                     ) : error ? (
//                       <h4>{error}</h4>
//                     ) : (
//                       <>
//                         <Container>
//                           <p> ${summary.ordersPrice}</p>
//                           <p>Products</p>
//                           <Link href='/admin/orders' passHref>
//                             <Button size='sm' variant='primary'>
//                               View sales
//                             </Button>
//                           </Link>
//                         </Container>
//                         <Container>
//                           <p>{summary.ordersCount}</p>
//                           <p>Orders</p>
//                           <Link href='/admin/orders' passHref>
//                             <Button size='sm' variant='primary'>
//                               View orders
//                             </Button>
//                           </Link>
//                         </Container>
//                         <Container>
//                           <p> {summary.productsCount}</p>
//                           <p>Products</p>
//                           <Link href='/admin/products' passHref>
//                             <Button size='sm' variant='primary'>
//                               View products
//                             </Button>
//                           </Link>
//                         </Container>
//                         <Container>
//                           <p> {summary.usersCount}</p>
//                           <p>Users</p>
//                           <Link href='/admin/users' passHref>
//                             <Button size='sm' variant='primary'>
//                               View products
//                             </Button>
//                           </Link>
//                         </Container>
//                       </>
//                     )}
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <h1>Sales chart</h1>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Bar
//                       data={{
//                         labels: summary.salesData.map((x) => x._id),
//                         datasets: [
//                           {
//                             label: 'Sales',
//                             backgroundColor: 'rgba(162, 222, 208, 1)',
//                             data: summary.salesData.map((x) => x.totalSales),
//                           },
//                         ],
//                       }}
//                       options={{
//                         legend: { display: true, position: 'right' },
//                       }}
//                     ></Bar>
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//       </>
//     </div>
//   )
// }

// Admindashboard.Layout = Layout
