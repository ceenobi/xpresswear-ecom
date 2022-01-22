import {useState} from 'react'
import {Button} from 'react-bootstrap'
import { func } from 'prop-types'

export default function Toggleswitch({toggleTheme }) {
    const [isOff, setIsOff] = useState(true)
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
    ) 
   
}
 Toggleswitch.propTypes = {
   toggleTheme: func.isRequired,
 } 