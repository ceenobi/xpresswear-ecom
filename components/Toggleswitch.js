import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { func, string } from 'prop-types'

export default function Toggleswitch({ theme, toggleTheme }) {
    const [isOff, setIsOff] = useState(true)
    const isLight = theme === 'light'
    return (
      <Button
        variant='none'
        onClick={() => {
          toggleTheme()
          setIsOff(!isOff)
        }}
        className='text-start'
      >
        {isOff ? (
          <i className='bi bi-toggle2-off'></i>
        ) : (
          <i className='bi bi-toggle2-on text-info'></i>
        )}
      </Button>
      // <Form>
      //   <Form.Check
      //     type='switch'
      //     id='custom-switch'
      //     onClick={()=>toggleTheme()}
      //   />
      // </Form>
    ) 
   
}
 Toggleswitch.propTypes = {
   theme: string.isRequired,
   toggleTheme: func.isRequired,
 } 