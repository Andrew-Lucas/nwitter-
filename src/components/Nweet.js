import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import { Db, storage } from '../firebase'

const Nweet = ({ nweetObj, owner, onFileChange }) => {
  const [editing, setEditing] = useState(false)
  const [nweetUpdate, setNweetUpdate] = useState(nweetObj.nweet)

  function toogleEditing() {
    setEditing((prev) => !prev)
  }

  function editTweetInput(event) {
    const {
      target: { value },
    } = event
    setNweetUpdate(value)
  }

  const editAtachementInput = useRef()
  if (editing && owner) {
    console.log(editAtachementInput)
  }

  const [edited, setEdited] = useState(false)
  async function editTweetSubmit(event) {
    event.preventDefault()
    console.log(nweetObj)
    await Db.doc(`nweets/${nweetObj.id}`).update({
      nweet: nweetUpdate,
    })
    setEditing(false)
    setEdited(true)

    setTimeout(() => {
      setEdited(false)
    }, 2500)
  }

  const deleteTweet = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this tweet?'
    )
    if (confirmed) {
      console.log(nweetObj)
      await Db.doc(`nweets/${nweetObj.id}`).delete()
      await storage.refFromURL(nweetObj.atachementURL).delete()
    }
  }

/*   console.log(nweetObj.ownerProfilePicture) */

  return (
    <div>
      {owner && edited && <span>Edited!!!</span>}
      <>
        {editing && owner ? (
          <>
            <form onSubmit={editTweetSubmit}>
              <input
                ref={editAtachementInput}
                onChange={onFileChange}
                type="file"
                accept="image/*"
              />
              <input
                value={nweetUpdate}
                onChange={editTweetInput}
                placeholder="Edit this nweet"
              />
              <input type="submit" value="Edit" />
            </form>
            <button onClick={toogleEditing}>Cancel</button>
          </>
        ) : (
          <>
            {nweetObj.ownerProfilePicture || nweetObj.ownerProfilePicture === '' ? (
              <>
                <img
                  alt=""
                  src={nweetObj.ownerProfilePicture}
                  height="50"
                  width="50"
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUser} />
              </>
            )}
            <span>{nweetObj.ownerUsername}</span>
            <h4>{nweetObj.nweet}</h4>
            {nweetObj.atachementURL !== '' && (
              <img
                alt=""
                src={nweetObj.atachementURL}
                height="100"
                width="100"
              />
            )}
            {owner ? (
              <>
                <button onClick={toogleEditing}>Edit</button>
                <button onClick={deleteTweet}>Delete</button>
              </>
            ) : null}
          </>
        )}
      </>
    </div>
  )
}

export default Nweet
