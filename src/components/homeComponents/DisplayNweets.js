import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Db, storage } from '../../firebase'

const DisplayNweets = ({ nweetObj, toogleEditing, owner }) => {
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

  return (
    <div>
      {nweetObj.ownerProfilePicture || nweetObj.ownerProfilePicture === '' ? (
        <>
          <img
            alt=""
            src={nweetObj.ownerProfilePicture}
            height="35"
            width="35"
            style={{ borderRadius: '50%' }}
          />
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faUser} size="2x" />
        </>
      )}
      <strong style={{ marginLeft: '5px' }}>{nweetObj.ownerUsername}</strong>
      <br></br>
      <span>{nweetObj.nweet}</span>
      <br></br>
      {nweetObj.atachementURL && nweetObj.atachementURL !== '' && (
        <>
          <img alt="" src={nweetObj.atachementURL} height="200" width="200" />
          <br></br>
        </>
      )}
      {owner ? (
        <>
          <button onClick={toogleEditing}>Edit</button>
          <button onClick={deleteTweet}>Delete</button>
        </>
      ) : null}
    </div>
  )
}

export default DisplayNweets
