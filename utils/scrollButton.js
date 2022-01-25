// import React from 'react'
// import { useState } from 'react'
// import styled from 'styled-components'

// export default function Scrollbutton() {
//     const [visible, setVisible] = useState(false)

//     const toggleVisible = () => {
//       const scrolled = document.documentElement.scrollTop
//       if (scrolled > 1500) {
//         setVisible(true)
//       } else if (scrolled <= 1500) {
//         setVisible(false)
//       }
//     }

//     const scrollToTop = () => {
//       window.scrollTo({
//         top: 0,
//         behaviour: 'smooth',
//       })
//     }
//     window.addEventListener('scroll', toggleVisible)
//     return (
//       <>
//         <Scroll>
//           <div>
//             <i
//               className='bi bi-arrow-up-square-fill'
//               onClick={scrollToTop}
//               style={{ display: visible ? 'inline' : 'none' }}
//             ></i>
//           </div>
//         </Scroll>
//       </>
//     )
// }
// const Scroll = styled.div`
//   .bi-arrow-up-square-fill {
//     position: fixed;
//     left: 85%;
//     bottom: 40px;
//     height: 20px;
//     font-size: 2rem;
//     z-index: 1;
//     cursor: pointer;
//     color: #17a2b8;
//   }
//   @media (min-width: 992px) {
//     .bi-arrow-up-square-fill {
//       left: 95%;
//     }
//   }
// `
