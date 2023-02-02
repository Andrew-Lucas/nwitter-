import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { clientAuth, Db } from "../firebase";

export default ({userObj}) => {
  console.log(userObj)
  const navigate = useNavigate()

  const onLogout = ()=> {
    signOut(clientAuth)
    navigate("/")
  }

  async function getMyNweets(){
    const myNweets = await Db.collection("nweets").where("ownerId", "==", userObj.uid).get()
    console.log(myNweets.docs.map(doc => doc.data()))
  }
  useEffect(()=>{
    getMyNweets()
  }, [])

  return (
    <>
      <button onClick={onLogout}>Logout</button>
    </>
  )
};