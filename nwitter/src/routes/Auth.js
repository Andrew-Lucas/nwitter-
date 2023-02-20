/* eslint-disable no-unreachable */
/* eslint-disable no-throw-literal */
import React, { useState } from 'react'
import SignInSignUpSwitch from '../components/authComponents/SignInSignUpSwitch'
import SignUpForm from '../components/authComponents/SignUpForm'
import SocialLogin from '../components/authComponents/SocialLogin'

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  function toogleLoginOrSignin() {
    return setNewAccount((prev) => !prev)
  }

  return (
    <div>
      {error ? <span>{error}</span> : null}
      <SignUpForm newAccount={newAccount} setError={setError} />
      <SignInSignUpSwitch
        newAccount={newAccount}
        toogleLoginOrSignin={toogleLoginOrSignin}
      />
      <SocialLogin />
    </div>
  )
}

export default Auth
