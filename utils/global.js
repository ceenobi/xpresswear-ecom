import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  margin: 0;
  padding: 0;
  *::after,
  *::before {
    box-sizing: border-box;
  }
  a {
    text-decoration: none!important;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
  .card {
     background: ${({ theme }) => theme.body};
     color: ${({ theme }) => theme.text};
     border: ${({ theme }) => theme.border};
     transition: all 0.25s linear;
  }
.accordion-body, .offcanvas{
    background: ${({ theme }) => theme.body};
     color: ${({ theme }) => theme.text};
     transition: all 0.25s linear;
}
.nav-link, a.navbar-brand {
  color:white!important;
}
.nav-link:hover , .nav-link .bi:hover, footer a {
  color: #17a2b8!important;
  transition: all 0.25s linear;
}
  .cart-bg {
    background: ${({ theme }) => theme.body};
     color: ${({ theme }) => theme.text};
     border: ${({ theme }) => theme.border};
     transition: all 0.25s linear;
  }
.main-bg {
  background: ${({ theme }) => theme.main};
   transition: all 0.25s linear;
}
.cart-text, .form-check-label  {
  color: #FAFAFA;
}
ul li a, .cart-title {
  color: #9e9e9e;
}

  input.form-control {
  border-top: none!important;
  border-left: none!important;
  border-right: none!important;
  border-bottom: 1px solid black;
  border-radius: 0 !important;
  background: ${({ theme }) => theme.body};  
}
.form-check-label {
    color: ${({ theme }) => theme.bicarttext};
}
.bi {
  font-size: 18px;
  color: white;
}

.bicart {
   color: ${({ theme }) => theme.bicarttext};
}

 footer a:hover  {
  color: white!important;
  text-decoration: none;
}

@media screen and (max-width: 700px) and (min-width: 350px) {
.size {
  font-size: 17px;
}
footer .p {
  font-size: 18px!important;
}
}

 @media (max-width: 700px) {
   .empty-cart {
     width:150px;
     height: 150px;
   }
 }

  @media (max-width: 300px) { 
    h2 , h4,  a.navbar-brand, .btn {
      font-size: 14px!important;
    }
    p , a , .bi {
      font-size: 12px;
    }
  } 
  `
