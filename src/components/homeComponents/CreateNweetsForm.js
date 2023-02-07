import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Db, storage } from '../../firebase'

const CreateNweetsForm = ({ userObj, nweet, setNweet, onFileChange }) => {
  const [atachement, setAtachement] = useState(null)

  const inputChange = (event) => {
    const {
      target: { value },
    } = event
    setNweet(value)
  }

  const atachementInput = useRef()
  const clearAttachement = () => {
    setAtachement(null)
    atachementInput.current.value = ''
  }

  const formSubmit = async (event) => {
    event.preventDefault()
    if (nweet !== '' || atachement || atachement !== '') {
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
          ownerUsername: userObj.displayName
            ? userObj.displayName
            : `User: ${userObj.uid}`,
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
    <form onSubmit={formSubmit}>
      <input
        value={nweet}
        onChange={inputChange}
        type="text"
        placeholder="Whats on your mind?"
      />
      <input
        ref={atachementInput}
        onChange={() => onFileChange(setAtachement, atachementInput)}
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
  )
}

export default CreateNweetsForm
