import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { signOut, updateCurrentUser, updateProfile } from 'firebase/auth'
import { clientAuth, Db, storage } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const EditProfileAndLogout = ({
  userObj,
  refreshUser,
  myNweets,
  myNweetsIds,
}) => {
  const navigate = useNavigate()

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
        displayName:
          inputValue !== userObj.displayName ? inputValue : userObj.displayName,
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
            ownerUsername: userObj.displayName
              ? userObj.displayName
              : `User: ${userObj.uid}`,
          })
        })
      })
    }
  }

  const onLogout = () => {
    signOut(clientAuth)
    refreshUser()
    navigate('/')
  }
  return (
    <>
      <form onSubmit={formSubmit}>
        {currentPhoto ? (
          <>
            <img style={{borderRadius: "50%"}} src={currentPhoto} height="100px" width="100px" alt="" />
            <br></br>
            <button onClick={removePhotoURL}>Remove Profile Photo</button>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faUser} size="5x" />
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
      <button style={{color: "red"}} onClick={onLogout}>Logout</button>
    </>
  )
}

export default EditProfileAndLogout
