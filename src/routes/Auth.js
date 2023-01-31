import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import { clientAuth } from '../firebase';

const errorFormat = (errMsg) =>{
  if(!errMsg){
    throw "You did not pass any arguements in 'errorFormat'"
    return
  }
  if(typeof errMsg !== "string"){
    throw "The arguement in 'errorFormat' must be a string"
    return
  }
  const error = errMsg.substr(10, errMsg.length-10)
  return error
}

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)

  const [error, setError] = useState("")

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
  function toogleLoginOrSignin(){
    return setNewAccount((prev)=> !prev)
  }

  const socialLogin = async (event)=>{
    const {target:{name}} = event
    console.log(name)
    let provider;
    if(name === "github"){
      provider = new GithubAuthProvider()
    } else if(name === "google"){
      provider = new GoogleAuthProvider()
    }
    console.log(provider)
    const data = await signInWithPopup(clientAuth, provider)
    console.log(data)
  }

  return (
    <div>
      {error ? <span>{error}</span> : null}
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
      {newAccount ? <>
      <span>Already have an account? </span><span style={{color: "royalblue", cursor: 'pointer'}} onClick={toogleLoginOrSignin}>Login instead</span>
      </> : <>
      <span>Don't have an account? </span><span style={{color: "royalblue", cursor: 'pointer'}} onClick={toogleLoginOrSignin}>Create an account</span>
      </>}
      <div>
        <button onClick={socialLogin} name='github'>Continue with github</button>
        <button onClick={socialLogin} name='google'>Continue with google</button>
      </div>
    </div>
  )
}

export default Auth
