import React, { useState } from 'react'
import { Db } from '../../firebase'
import DisplayNweets from './DisplayNweets'
import EditingNweet from './EditingNweet'

const NweetEditAndDisplay = ({ nweetObj, owner, onFileChange }) => {
  const [editing, setEditing] = useState(false)

  function toogleEditing() {
    setEditing((prev) => !prev)
  }

  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [nweetUpdate, setNweetUpdate] = useState(nweetObj.nweet)
  const [edited, setEdited] = useState(false)

  async function editTweetSubmit(event) {
    event.preventDefault()
    console.log(nweetObj)
    console.log('In edit Tweet 1::', currentPhoto)
    await Db.doc(`nweets/${nweetObj.id}`).update({
      nweet: nweetUpdate,
      atachementURL: currentPhoto !== '' ? currentPhoto : '',
    })
    console.log('In edit Tweet 2::', currentPhoto)
    setEditing(false)
    setEdited(true)

    setTimeout(() => {
      setEdited(false)
    }, 2500)
  }

  return (
    <div style={{
      borderTop: 'solid 1px lightgrey',
      margin: '7px 0px',
      padding: '5px',
    }}>
      {owner && edited && <span>Edited!!!</span>}
      <>
        {editing && owner ? (
          <EditingNweet
            nweetUpdate={nweetUpdate}
            setNweetUpdate={setNweetUpdate}
            editTweetSubmit={editTweetSubmit}
            nweetObj={nweetObj}
            owner={owner}
            toogleEditing={toogleEditing}
            setCurrentPhoto={setCurrentPhoto}
            onFileChange={onFileChange}
          />
        ) : (
          <DisplayNweets
            nweetObj={nweetObj}
            owner={owner}
            toogleEditing={toogleEditing}
          />
        )}
      </>
    </div>
  )
}

export default NweetEditAndDisplay
