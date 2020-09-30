import { Button, FormGroup, TextField } from '@material-ui/core'
import React, { useState } from 'react'

const SignUp = () => {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [user, setUser] = useState({
    email: '',
    name: '',
    avatar: '',
    role: 0,
  })

  const handleUserChange = e => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(user)
    if (confirmPassword.length > 6 && user.password.length > 6 && confirmPassword !== user.password) {
      console.log('fuq')
    } else {
      console.log('heyy')
    }
  }

  return (
    <form className='mw-512' onSubmit={handleSubmit}>
      <FormGroup className='form__group'>
        <TextField type='email' variant='outlined' name='email' onChange={handleUserChange} />
      </FormGroup>
      <FormGroup className='form__group'>
        <TextField variant='outlined' name='name' onChange={handleUserChange} />
      </FormGroup>
      <FormGroup className='form__group'>
        <TextField type='password' variant='outlined' name='password' onChange={handleUserChange} />
      </FormGroup>
      <FormGroup className='form__group'>
        <TextField type='password' variant='outlined' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </FormGroup>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default SignUp
