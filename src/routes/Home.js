import React, { useEffect, useState } from 'react'
import Nweet from '../components/Nweet'
import { Db } from '../firebase'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [allNweets, setAllNweets] = useState([])

  const formSubmit = async (event) => {
    event.preventDefault()
    await Db.collection('nweets').add({
      nweet,
      createdAt: Date.now(),
      ownerId: userObj.uid,
    })
    setNweet('')
  }

  /*   const getNweets = async () => {
    const dbNweets = await Db.collection('nweets').get()
    setAllNweets([])
    dbNweets.forEach((doc) => {
      setAllNweets((prevNweets) => [doc.data(), ...prevNweets])
    })
  } */

  useEffect(() => {
    Db.collection('nweets').onSnapshot((snapshots) => {
      const nweetArray = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setAllNweets(nweetArray)
      setNweet('')
    })
  }, [])

  const inputChange = (event) => {
    const {
      target: { value },
    } = event
    setNweet(value)
  }
  return (
    <div>
      <form onSubmit={formSubmit}>
        <input
          value={nweet}
          onChange={inputChange}
          type="text"
          placeholder="Whats on your mind?"
        />
        <button>Nweet</button>
      </form>
      <div>
        {allNweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            owner={String(nweet.ownerId) === String(userObj.uid)}
          />
          /* <div key={nweet.createdAt} id={nweet.createdAt}>
            <h4>
            {nweet.nweet}
            </h4>
          </div> */
        ))}
      </div>
    </div>
  )
}

export default Home
