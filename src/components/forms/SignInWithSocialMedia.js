import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signInWithProvider } from '../../actions/auth'

const SignInWithSocialMedia = () => {
  const dispatch = useDispatch()
  const handleClick = type => {
    dispatch(signInWithProvider(type))
  }

  return (
    <div>
      <Button className='full__width' onClick={() => handleClick('google')}>GOOGLE</Button>
      {/* <Button onClick={() => handleClick('facebook')}>FACEBOOK</Button> */}
    </div>
  )
}

export default SignInWithSocialMedia
