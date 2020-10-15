import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SignInWithSocialMedia from '../../components/forms/SignInWithSocialMedia'
import SignUp from '../../components/forms/SignUp'
import './Auth.css'
import heb from '../../utils/translation/heb'

const Auth = () => {
  const { loading, isAuth, anonymous } = useSelector(state => state.auth)

  if (!loading && isAuth && !anonymous) {
    return <Redirect to='/' />
  } else {
    return (
      <div className='auth__container rtl p-2 m-2'>
        <Paper className='auth_options__container br-16'>
          {!loading && isAuth && !anonymous && <Redirect to='/' />}
          <Typography variant='h1'>{heb.signIn}</Typography>
          <SignInWithSocialMedia />
          {/* <SignUp /> */}
        </Paper>
      </div>
    )
  }
}

export default Auth
