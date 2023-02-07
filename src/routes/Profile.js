/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Db } from '../firebase'
import EditProfileAndLogout from '../components/profileComponents/EditProfileAndLogout'
import GetMyNweets from '../components/profileComponents/GetMyNweets'

export default ({ userObj, refreshUser }) => {
  const [myNweets, setMyNweets] = useState([])
  const [myNweetsIds, setMyNweetsIds] = useState([])

  async function getMyNweets() {
    const allNweets = await Db.collection('nweets')
      .where('ownerId', '==', userObj.uid)
      .get()
    setMyNweets([])
    setMyNweetsIds([])
    allNweets.docs.map((doc) => {
      setMyNweetsIds((prevIds) => [doc.id, ...prevIds])
      return setMyNweets((prevNweets) => [doc.data(), ...prevNweets])
    })
  }
  useEffect(() => {
    getMyNweets()
  }, [])

  return (
    <>
      <EditProfileAndLogout
        userObj={userObj}
        refreshUser={refreshUser}
        myNweets={myNweets}
        myNweetsIds={myNweetsIds}
      />
      <GetMyNweets myNweets={myNweets} />
    </>
  )
}
