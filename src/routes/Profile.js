/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
import { signOut, updateCurrentUser, updateProfile } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clientAuth, Db, storage } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default ({ userObj, refreshUser }) => {
  const navigate = useNavigate()

  const onLogout = () => {
    signOut(clientAuth)
    refreshUser()
    navigate('/')
  }

  const [myNweets, getNweets] = useState([])
  const [myNweetsIds, setMyNweetsIds] = useState([])
  async function getMyNweets() {
    const allNweets = await Db.collection('nweets')
      .where('ownerId', '==', userObj.uid)
      .get()
    getNweets([])
    setMyNweetsIds([])
    allNweets.docs.map((doc) => {
      setMyNweetsIds((prevIds) => [doc.id, ...prevIds])
      return getNweets((prevNweets) => [doc.data(), ...prevNweets])
    })
  }
  useEffect(() => {
    getMyNweets()
  }, [])

  const [inputValue, setInputValue] = useState(userObj.displayName)
  const inputChange = (event) => {
    setInputValue(event.target.value)
  }

  const photoUrl = useRef()
  const [currentPhoto, setCurrentPhoto] = useState(userObj.photoURL || '')

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
        setCurrentPhoto(result)
      }
    }
  }

  async function formSubmit(event) {
    event.preventDefault()
    if (
      inputValue !== userObj.displayName ||
      currentPhoto !== userObj.photoURL
    ) {
      let currentPhotoURL
      if (currentPhoto && currentPhoto !== '') {
        if (userObj.photoURL) {
          await storage.refFromURL(userObj.photoURL).delete()
        }
        const fileRef = storage.ref().child(`${userObj.uid}/profilePhotoURL`)
        const response = await fileRef.putString(currentPhoto, 'data_url')
        currentPhotoURL = await response.ref.getDownloadURL()
        console.log(currentPhotoURL)
      }
      console.log(updateCurrentUser, updateProfile)
      await updateProfile(clientAuth.currentUser, {
        displayName: inputValue,
        photoURL:
          currentPhotoURL || currentPhoto === ''
            ? currentPhotoURL
            : userObj.photoURL,
      })
      console.log(clientAuth.currentUser)
      refreshUser()
      //Update this users nweets
      myNweets.forEach((eachNweet) => {
        myNweetsIds.forEach(async (id) => {
          console.log('An ID', id)
          await Db.doc(`nweets/${id}`).update({
            ownerProfilePicture: userObj.photoURL,
            ownerUsername: userObj.displayName,
          })
        })
      })
    }
  }

  async function removePhotoURL() {
    console.log('Cleared Photo')
    await updateProfile(clientAuth.currentUser, {
      photoURL: '',
    })
    setCurrentPhoto('')
    refreshUser()
    //Update this users nweets
    myNweets.forEach((eachNweet) => {
      console.log(eachNweet)
      myNweetsIds.forEach(async (id) => {
        await Db.doc(`nweets/${id}`).update({
          ownerProfilePicture: userObj.photoURL,
        })
      })
    })
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        {currentPhoto ? (
          <>
            <img src={currentPhoto} height="100px" width="100px" alt="" />
            <button onClick={removePhotoURL}>Remove Profile Photo</button>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faUser} />
          </>
        )}

        <input
          onChange={onFileChange}
          type="file"
          accept="image/*"
          ref={photoUrl}
        />
        <input
          type="text"
          value={inputValue ? inputValue : ''}
          placeholder="Write your Username"
          onChange={inputChange}
        />
        <input type="submit" value="Update Profile"></input>
      </form>
      <button onClick={onLogout}>Logout</button>
      <h2>My Nweets</h2>
      <div>
        {myNweets.map((myNweet) => {
          return (
            <div key={myNweet.createdAt}>
              {myNweet.atachementURL !== '' && (
                <img
                  alt=""
                  src={myNweet.atachementURL}
                  height="100"
                  width="100"
                />
              )}
              <span>{myNweet.nweet}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
