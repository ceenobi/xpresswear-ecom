import { Spinner } from 'react-bootstrap'

export default function Spin() {
  return (
    <>
      <div className='d-flex justify-content-center py-5 mt-5'>
        <div>
          <Spinner animation='grow' role='status' variant='danger'>
            <span className='visually-hidden mt-5'>Loading...</span>
          </Spinner>
        </div>
      </div>
    </>
  )
}
