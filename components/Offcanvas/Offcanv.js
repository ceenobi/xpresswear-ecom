import React, {useState } from 'react'
import { Offcanvas, Nav, Container} from 'react-bootstrap'
import Search from '../Search'
import Link from 'next/link'

function OffCanvaz({ name, ...props }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className='align-self-lg-center d-lg-none flex-grow-1'>
      <i className='bi bi-list' onClick={handleShow} type='button' />
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ background: '#000000' }}
      >
        <Offcanvas.Header>
          <i
            className='bi bi-x-lg'
            type='button'
            aria-label='Close'
            onClick={handleClose}
          ></i>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Nav className='me-auto'>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Shop</Nav.Link>
              </Link>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Clothing</Nav.Link>
              </Link>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Bag</Nav.Link>
              </Link>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Footwear</Nav.Link>
              </Link>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Wristwatch</Nav.Link>
              </Link>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Belts</Nav.Link>
              </Link>
              <Link href='/shop/products' passHref>
                <Nav.Link className='mb-2 border-bottom'>Help</Nav.Link>
              </Link>
              {/* <Nav className='mx-3 mt-4'>
                <Search />
              </Nav> */}
            </Nav>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default function Offcanv() {
  return (
    <>
      {['start'].map((placement, idx) => (
        <OffCanvaz key={idx} placement={placement} name={placement} />
      ))}
    </>
  )
}
