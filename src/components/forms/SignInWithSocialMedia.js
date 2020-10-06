import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithProvider } from '../../actions/auth'
import GoogleIcon from '../../assets/svgs/GoogleIcon'
import heb from '../../utils/translation/heb'
import './SignInWithSocialMedia.css'

const SignInWithSocialMedia = () => {
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleClick = type => {
    dispatch(signInWithProvider(type))
  }

  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <div className='sign_in_with_social_media__container'>
        <Button variant='outlined' className='full__width flex align__center justify__between' onClick={() => handleClick('google')}>
          <span className='button__label'>{heb.signInWithGoogle}</span>
          <GoogleIcon style={{ height: 18, width: 18 }} />
        </Button>
      </div>
    )
  }
}

export default SignInWithSocialMedia
