import React, { useState } from 'react'
import { Form, FormControl, InputGroup , Button} from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function Search() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const queryChangeHandler = (e) => {
    setQuery(e.target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    router.push(`/search?query=${query}`)
  }
  return (
    <>
      <Form onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            aria-label='Small'
            aria-describedby='inputGroup-sizing-sm'
            placeholder='What are you looking for?'
            onChange={queryChangeHandler}
          />
          <Button type='submit' variant='none'>
            <i
              className='bi bi-search align-self-center mx-2'
              aria-label='search'
            ></i>
          </Button>
        </InputGroup>
      </Form>
    </>
  )
}
