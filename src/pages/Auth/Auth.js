import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SignInWithSocialMedia from '../../components/forms/SignInWithSocialMedia'
import SignUp from '../../components/forms/SignUp'

const Auth = () => {
  const { loading, isAuth, role } = useSelector(state => state.auth)
  return (
    <div>
      {!loading && isAuth && role >= 1 && <Redirect to='/' />}
      <SignInWithSocialMedia />
      {/* <SignUp /> */}
    </div>
  )
}

export default Auth
