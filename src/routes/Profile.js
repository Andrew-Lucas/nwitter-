import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom"

export default () => {
  const auth = getAuth()
  const navigate = useNavigate()

  const onLogout = ()=> {
    signOut(auth)
    navigate("/")
  }

  return (
    <>
      <button onClick={onLogout}>Logout</button>
    </>
  )
};