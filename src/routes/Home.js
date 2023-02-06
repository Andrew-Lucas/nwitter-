/* import { getDownloadURL, ref, uploadString } from 'firebase/storage' */
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Nweet from '../components/Nweet'
import { Db, storage } from '../firebase'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [allNweets, setAllNweets] = useState([])
  const [atachement, setAtachement] = useState(null)

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

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event
    const fileToRead = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(fileToRead)
    if (reader) {
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent
        setAtachement(result)
      }
    }
  }

  const atachementInput = useRef()
  const clearAttachement = () => {
    setAtachement(null)
    atachementInput.current.value = ''
  }

  const formSubmit = async (event) => {
    event.preventDefault()
    if (nweet !== '') {
      try {
        let atachementURL
        if (atachement) {
          const fileRef = storage.ref().child(`${userObj.uid}/${uuidv4()}`)
          const response = await fileRef.putString(atachement, 'data_url')
          atachementURL = await response.ref.getDownloadURL()
        }
        const newNweet = {
          nweet,
          createdAt: Date.now(),
          ownerId: userObj.uid,
          ownerProfilePicture: userObj.photoURL,
          ownerUsername: userObj.displayName,
          atachementURL: atachementURL ? atachementURL : '',
        }
        await Db.collection('nweets').add(newNweet)
        atachementInput.current.value = ''
        setNweet('')
        setAtachement('')
      } catch (err) {
        console.log('Console logged error:: ', err)
      }
    }
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
        <input
          ref={atachementInput}
          onChange={onFileChange}
          type="file"
          accept="image/*"
        />
        {atachement && (
          <>
            <img src={atachement} height="100px" width="100px" alt="" />
            <button onClick={clearAttachement}>Clear Image</button>
          </>
        )}
        <button>Nweet</button>
      </form>
      <div>
        {allNweets.map((nweet) => {
          console.log(nweet.id)
          return (
            <Nweet
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
