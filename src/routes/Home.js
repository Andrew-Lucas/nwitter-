/* import { getDownloadURL, ref, uploadString } from 'firebase/storage' */
import React, { useEffect, useState } from 'react'
import CreateNweetsForm from '../components/homeComponents/CreateNweetsForm'
import NweetEditAndDisplay from '../components/homeComponents/NweetEditAndDisplay'
import { Db } from '../firebase'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [allNweets, setAllNweets] = useState([])

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

  const onFileChange = (setFile, event, stateSeter = '') => {
    const {
      current: { files },
    } = event
    const fileToRead = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(fileToRead)
    if (reader) {
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent
        setFile(result)
        if (typeof stateSeter === 'function') {
          stateSeter(result)
        }
      }
    }
  }

  console.log(userObj.uid)

  return (
    <div>
      <CreateNweetsForm
        nweet={nweet}
        setNweet={setNweet}
        userObj={userObj}
        onFileChange={onFileChange}
      />
      <div>
        {allNweets.map((nweet) => {
          return (
            <NweetEditAndDisplay
              onFileChange={onFileChange}
              key={nweet.id}
              nweetObj={nweet}
              owner={String(nweet.ownerId) === String(userObj.uid)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
