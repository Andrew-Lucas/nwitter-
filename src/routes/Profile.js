import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom"
import { clientAuth } from "../firebase";

export default () => {
  const navigate = useNavigate()

  const onLogout = ()=> {
    signOut(clientAuth)
    navigate("/")
  }

  return (
    <>
      <button onClick={onLogout}>Logout</button>
    </>
  )
};