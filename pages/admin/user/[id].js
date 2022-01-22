// import React, { useContext, useEffect, useReducer, useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import { getError } from '../../../utils/error'
// import { Store } from '../../../utils/store'
// import { ToastContainer, toast, Slide } from 'react-toastify'
// import Spin from '../components/Spinner'
// import Head from 'next/head'
// import { Container, Card, ListGroup, Row, Col, Form , FloatingLabel, Button} from 'react-bootstrap'
// import { useForm } from 'react-hook-form'

// function reducer(state, action) {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true, error: '' }
//     case 'FETCH_SUCCESS':
//       return { ...state, loading: false, error: '' }
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload }
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true, errorUpdate: '' }
//     case 'UPDATE_SUCCESS':
//       return { ...state, loadingUpdate: false, errorUpdate: '' }
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false, errorUpdate: action.payload }
//     case 'UPLOAD_REQUEST':
//       return { ...state, loadingUpload: true, errorUpload: '' }
//     case 'UPLOAD_SUCCESS':
//       return {
//         ...state,
//         loadingUpload: false,
//         errorUpload: '',
//       }
//     case 'UPLOAD_FAIL':
//       return { ...state, loadingUpload: false, errorUpload: action.payload }

//     default:
//       return state
//   }
// }

// export default function UserEdit({ params }) {
//   const userId = params.id
//   const { state } = useContext(Store)
//   const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
//     loading: true,
//     error: '',
//   })
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     setValue,
//   } = useForm()
//   const [isAdmin, setIsAdmin] = useState(false)
//   const { userInfo } = state
//   const router = useRouter()

//   useEffect(() => {
//     if (!userInfo) {
//       return router.push('/login')
//     } else {
//       const fetchData = async () => {
//         try {
//           dispatch({ type: 'FETCH_REQUEST' })
//           const { data } = await axios.get(`/api/admin/users/${userId}`, {
//             headers: { authorization: `Bearer ${userInfo.token}` },
//           })
//           setIsAdmin(data.isAdmin)
//           dispatch({ type: 'FETCH_SUCCESS' })
//           setValue('name', data.name)
//         } catch (err) {
//           dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
//         }
//       }
//       fetchData()
//     }
//   }, [])

//   const submitHandler = async ({ name }) => {
//     try {
//       dispatch({ type: 'UPDATE_REQUEST' })
//       await axios.put(
//         `/api/admin/users/${userId}`,
//         {
//           name,
//           isAdmin,
//         },
//         { headers: { authorization: `Bearer ${userInfo.token}` } }
//       )
//       dispatch({ type: 'UPDATE_SUCCESS' })
//       toast.success('User deleted successfully', {
//         position: toast.POSITION.TOP_CENTER,
//         transition: Slide,
//       })
//       router.push('/admin/users')
//     } catch (err) {
//       dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
//       toast.error(getError(err), {
//         position: toast.POSITION.TOP_CENTER,
//         transition: Slide,
//       })
//     }
//   }

//   return (
//     <div className='mt-md-5'>
//       <Head>
//         <title>{`Edit User ${userId}`}</title>
//       </Head>
//       <>
//         <Container>
//           <h1 className='m{ params }t-2 text-md-start text-center'>Shipping</h1>
//           <ToastContainer />
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
//               <Card style={{ width: '18rem' }}>
//                 <Card.Header> Edit User {userId}</Card.Header>
//                 <ListGroup variant='flush'>
//                   <ListGroup.Item>
//                     {' '}
//                     {loading && <Spin />}
//                     {error && <h1>{error}</h1>}
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card>
//             </Col>
//             <Col lg={6}>
//               <Form onSubmit={handleSubmit(submitHandler)}>
//                 <FloatingLabel
//                   controlId='floatingName'
//                   label='*Name'
//                   className='mb-4'
//                 >
//                   <Form.Control
//                     type='text'
//                     placeholder='create username'
//                     {...register('name', {
//                       required: true,
//                       minLength: 2,
//                     })}
//                   />
//                   <p className='text-start text-danger'>
//                     {errors.name
//                       ? errors.name.type === 'minLength'
//                         ? 'Name should be more than 1'
//                         : 'Name is required'
//                       : ''}
//                   </p>
//                 </FloatingLabel>
//                 <FloatingLabel
//                   controlId='floatingName'
//                   label='*Is Admin'
//                   className='mb-4'
//                 >
//                   <Form.Check
//                     aria-label='option 1'
//                     onClick={(e) => setIsAdmin(e.target.checked)}
//                     checked={isAdmin}
//                     name='isAdmin'
//                   />
//                 </FloatingLabel>
//                 <div className='mb-4 text-center'>
//                   <Button
//                     type='submit'
//                     variant='info'
//                     size='lg'
//                     className='shadow'
//                   >
//                     Update
//                   </Button>
//                   {loadingUpdate && <Spin/>}
//                 </div>
//               </Form>
//             </Col>
//           </Row>
//         </div>
//       </>
//     </div>
//   )
// }

// export async function getServerSideProps({ params }) {
//   return {
//     props: { params },
//   }
// }

