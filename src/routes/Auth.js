import React, { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)

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
      let data;
      if (newAccount) {
        //create account
        const auth = getAuth()
        data = await createUserWithEmailAndPassword(auth, email, password)
        console.log(data)
      } else {
        //login
        const auth = getAuth()
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
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
      <div>
        <button>Continue with github</button>
        <button>Continue with google</button>
      </div>
    </div>
  )
}

export default Auth
