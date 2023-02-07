import React from 'react'

const SignInSignUpSwitch = ({newAccount, toogleLoginOrSignin}) => {
  return (
    <>
      {newAccount ? (
        <>
          <span>Already have an account? </span>
          <span
            style={{ color: 'royalblue', cursor: 'pointer' }}
            onClick={toogleLoginOrSignin}>
            Login instead
          </span>
        </>
      ) : (
        <>
          <span>Don't have an account? </span>
          <span
            style={{ color: 'royalblue', cursor: 'pointer' }}
            onClick={toogleLoginOrSignin}>
            Create an account
          </span>
        </>
      )}
    </>
  )
}

export default SignInSignUpSwitch
