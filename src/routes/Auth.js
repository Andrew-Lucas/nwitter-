import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const inputChange = (event) => {
    const {target: {name, value}} = event
    if(name === "email"){
      setEmail(value)
    } else if(name === "password"){
      setPassword(value)
    }
    console.log("Email:", email, "Password:",password)
  }

  const formSubmit = (event) => {
    event.preventDefault()
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
        <input type="submit" value="Login" required />
      </form>
      <div>
        <button>Continue with github</button>
        <button>Continue with google</button>
      </div>
    </div>
  )
}

export default Auth
