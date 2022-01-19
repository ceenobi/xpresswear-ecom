import React from 'react'
import { Step, Stepper } from '@leafygreen-ui/stepper'

export default function CheckoutWizard({currentStep=0}) {
    return (
      <Stepper currentStep={currentStep}>
        <Step>Login</Step>
        <Step>Shipping Address</Step>
        <Step>Payment Method</Step>
        <Step>Place Order</Step>
      </Stepper>
    )
}
