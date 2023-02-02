import React, { useState } from 'react'
import { Db, storage } from '../firebase'

const Nweet = ({ nweetObj, owner }) => {
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

  const [edited, setEdited] = useState(false)
  async function editTweetSubmit(event) {
    event.preventDefault()
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
      await Db.doc(`nweets/${nweetObj.id}`).delete()
      await storage.refFromURL(nweetObj.atachementURL).delete()
    }
  }
  return (
    <div>
      {owner && edited && <span>Edited!!!</span>}
      <>
        {editing && owner ? (
          <>
            <form onSubmit={editTweetSubmit}>
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
