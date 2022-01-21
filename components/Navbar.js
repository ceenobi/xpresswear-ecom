import React, { useContext} from 'react'
import { Nav, Navbar, Container, Badge } from 'react-bootstrap'
import Link from 'next/link'
import Toggleswitch from './Toggleswitch'
import { Store } from '../utils/store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
// import Search from './Search'
import Offcanv from './Offcanvas/Offcanv'
import styled from 'styled-components'
import ShopMenu from './SubNavmenu/ShopMenu'
import ClothingMenu from './SubNavmenu/ClothingMenu'
import BagMenu from './SubNavmenu/BagMenu'
import FootMenu from './SubNavmenu/FootMenu'
import WatchMenu from './SubNavmenu/WatchMenu'
import BeltMenu from './SubNavmenu/Belts'
import HelpMenu from './SubNavmenu/HelpMenu'

export default function Navbaz({ theme, toggleTheme }) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { cart, userInfo } = state

  const loginMenuClickHandler = (e, redirect) => {
    if (redirect) {
      router.push(redirect)
    }
  }
  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' })
    Cookies.remove('userInfo')
    Cookies.remove('cartItems')
    Cookies.remove('shippingAddress')
    Cookies.remove('paymentMethod')
    router.push('/')  
  }

  return (
    <Navmenu>
      <Navbar
        variant='none'
        expand='lg'
        style={{ background: '#000000' }}
        className='shadow'
      >
        <Container>
          <Offcanv />
          <Link href='/' passHref>
            <Navbar.Brand className='fw-bold text-uppercase flex-grow-1 flex-lg-grow-0'>
              XpressWear
            </Navbar.Brand>
          </Link>

          <Navbar.Collapse id='basic-navbar-nav' className='d-none d-lg-block'>
            <Nav className='me-auto mt-3'>
              <Link href='/shop/products' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text'>Shop</p>
                  <div className='menudown-content border-top'>
                    <ShopMenu />
                  </div>
                </div>
              </Link>
              <Link href='/shop/clothing' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text active'>Clothing</p>
                  <div className='menudown-content border-top'>
                    <ClothingMenu />
                  </div>
                </div>
              </Link>
              <Link href='/shop/bag' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text active'>Bag</p>
                  <div className='menudown-content border-top'>
                    <BagMenu />
                  </div>
                </div>
              </Link>
              <Link href='/shop/footwear' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text'>Footwear</p>
                  <div className='menudown-content border-top'>
                    <FootMenu />
                  </div>
                </div>
              </Link>
              <Link href='/shop/wristwatch' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text'>Wristwatch</p>
                  <div className='menudown-content border-top'>
                    <WatchMenu />
                  </div>
                </div>
              </Link>
              <Link href='/' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text'>Belts</p>
                  <div className='menudown-content border-top'>
                    <BeltMenu />
                  </div>
                </div>
              </Link>
              <Link href='/' passHref>
                <div className='menudown'>
                  <p className='menubtn cart-text'>Help</p>
                  <div className='menudown-content border-top'>
                    <HelpMenu />
                  </div>
                </div>
              </Link>
              {/* <Search className='' /> */}
            </Nav>
          </Navbar.Collapse>
          <>
            {userInfo ? (
              <div className='hoverdown ms-auto'>
                <p className='hoverbtn cart-text px- my-2'>{userInfo.name}</p>
                <div className='hoverdown-content'>
                  <p
                    type='button'
                    onClick={(e) => loginMenuClickHandler(e, '/profile')}
                  >
                    <small>Profile</small>
                  </p>
                  <p
                    type='button'
                    onClick={(e) => loginMenuClickHandler(e, '/order-history')}
                  >
                    <small>Order History</small>
                  </p>
                  {userInfo.isAdmin && (
                    <p
                      type='button'
                      onClick={(e) =>
                        loginMenuClickHandler(e, '/admin/dashboard')
                      }
                    >
                      <small> Admin Dashboard</small>
                    </p>
                  )}
                  <p type='button' onClick={logoutClickHandler}>
                    <small>Logout</small>
                  </p>
                </div>
              </div>
            ) : (
              <Link href='/login' passHref>
                <Nav.Link>
                  <i className='bi bi-person-fill align-self-center'></i>
                </Nav.Link>
              </Link>
            )}
            <Link href='/cart' passHref>
              <Nav.Link>
                {cart.cartItems.length > 0 ? (
                  <div className='d-flex'>
                    <i className='bi bi-cart-fill'></i>
                    <Badge pill bg='info'>
                      {cart.cartItems.length}
                    </Badge>
                  </div>
                ) : (
                  <i className='bi bi-cart-fill px-'></i>
                )}
              </Nav.Link>
            </Link>
            <Toggleswitch toggleTheme={toggleTheme} theme={theme} />
          </>
        </Container>
      </Navbar>
    </Navmenu>
  )
}

const Navmenu = styled.div`
  .hoverdown-content p {
    color: black;
    padding: 5px 7px;
    text-decoration: none;
    display: block;
    margin-bottom: 0;
  }

  .hoverbtn {
    color: white;
    padding: 5px;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }

  .hoverdown {
    position: relative;
    display: inline-block;
  }

  .hoverdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 130px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .hoverdown-content p:hover {
    background-color: #17a2b8;
  }

  .hoverdown:hover .hoverdown-content {
    display: block;
  }

  .hoverdown:hover .hoverbtn {
    color: #17a2b8;
    transition: all 0.25s linear;
  }

  .menudown {
    overflow: hidden;
  }
  .menubtn {
    color: white;
    padding: 5px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  .menudown-content {
    display: none;
    position: absolute;
    background-color: #000000;
    width: 100%;
    left: 0;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .menudown-content a:hover {
    color: #17a2b8 !important;
    transition: all 0.25s ease;
  }

  .menudown:hover .menudown-content {
    display: block;
  }

  .menudown:hover .menubtn {
    color: #17a2b8;
    transition: all 0.25s ease;
  }
`
