import React from 'react'
import {Container, Row, Col, Stack, Button} from 'react-bootstrap'

export default function PreFooter() {
    return (
      <div className='py-4 cart-title' style={{ background: '#1a1a1a' }}>
        <Container className='mt-2'>
          <Row className='justify-content-center'>
            <Col lg={5} md={6}>
              <p className='fw-bold'>Need assistance?</p>
              <p>
                XpressWear Client Service Center is available from Monday to
                Saturday from 10am to 10pm
              </p>
              <Stack gap={2} className='col-md-6 mr-auto mb-4'>
                <Button variant='warning'>Contact us by email</Button>
                <Button variant='primary' className='border-dark'>
                  +234800000000
                </Button>
              </Stack>
            </Col>
            <Col lg={5} md={6}>
              <p className='fw-bold'>100% SECURE PAYMENT</p>
              <p className='mb-4'>
                <small>
                  Your credit card details are safe with us. All the information
                  is protected using Secure Sockets Layer (SSL) Technology.
                </small>
              </p>
              <p className='fw-bold'>RETURN AND SHIPPING POLICIES</p>
              <p className='mb-4'>
                <small>
                  You have 12 days from the date of delivery to request a refund
                  or exchange. For any questions or immediate changes, please
                  contact Customer Care.
                </small>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    )
}
