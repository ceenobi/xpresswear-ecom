import {Container } from 'react-bootstrap'

export default function AccordionView({ product }) {
  return (
    <Container>
      <div>
        <p className='fw-bold'>About</p>
        <p>{product.description}</p>
      </div>
      <div>
        <p className='fw-bold'>Size & fit</p>
        <p>
          * The style fits true to size: we recommend ordering your normal shoe
          size <br />
          * For those with wider feet, we recommend ordering a half-size larger
          than your normal size
          <br />* For more information, please review the size guide
        </p>
      </div>
    </Container>
  )
}
