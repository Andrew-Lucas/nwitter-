/* eslint-disable no-unreachable */
/* eslint-disable no-throw-literal */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React, { useState } from 'react'
import { clientAuth } from '../../firebase'

const SignUpForm = ({ newAccount, setError }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const errorFormat = (errMsg) => {
    if (!errMsg) {
      throw "You did not pass any arguements in 'errorFormat'"
      return
    }
    if (typeof errMsg !== 'string') {
      throw "The arguement in 'errorFormat' must be a string"
      return
    }
    const error = errMsg.substr(10, errMsg.length - 10)
    return error
  }

  const inputChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const formSubmit = async (event) => {
    event.preventDefault()
    try {
      let data
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(clientAuth, email, password)
        console.log(data)
      } else {
        //login
        data = await signInWithEmailAndPassword(clientAuth, email, password)
      }
    } catch (err) {
      setError(errorFormat(err.message))
      console.dir(err)
    }
  }

  return (
    <form onSubmit={formSubmit}>
      <input
        name="email"
        onChange={inputChange}
        type="email"
        placeholder="Email"
        required
        value={email}
      />
      <input
        name="password"
        onChange={inputChange}
        type="password"
        placeholder="Password"
        required
        value={password}
      />
      <input
        type="submit"
        value={newAccount ? 'Create Account' : 'Log in'}
        required
      />
    </form>
  )
}

export default SignUpForm
