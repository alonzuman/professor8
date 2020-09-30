import React from 'react'
import SignInWithSocialMedia from '../../components/forms/SignInWithSocialMedia'
import SignUp from '../../components/forms/SignUp'

const AuthDialog = () => {
  const [tab, setTab] = useState('signIn')

  return (
    <div>
      <SignInWithSocialMedia />
      <SignUp />
    </div>
  )
}

export default AuthDialog
