import React, { useRef, useState } from 'react'
import { Db } from '../../firebase'

const EditingNweet = ({
  nweetObj,
  toogleEditing,
  nweetUpdate,
  setNweetUpdate,
  editTweetSubmit,
  setCurrentPhoto,
  onFileChange,
}) => {
  function editTweetInput(event) {
    const {
      target: { value },
    } = event
    setNweetUpdate(value)
  }

  const [imageEdit, setImageEdit] = useState(nweetObj.atachementURL)
  async function clickToRemoveImage() {
    await Db.doc(`nweets/${nweetObj.id}`).update({
      atachementURL: '',
    })
    setImageEdit('')
  }

  const editAtachementInput = useRef()
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
      <form onSubmit={editTweetSubmit}>
        {imageEdit && imageEdit !== '' && (
          <>
            <img
              style={{ marginBottom: '3px' }}
              alt=""
              src={imageEdit}
              height="70"
              width="70"
            />
            <br></br>
          </>
        )}
        <label
          style={{
            marginRight: '10px',
            backgroundColor: 'ghostwhite',
            padding: '2px 5px',
            border: 'solid 1px grey',
            borderRadius: '3px',
          }}
          htmlFor="photo">
          {nweetObj.atachementURL && nweetObj.atachementURL !== ''
            ? 'Change photo'
            : 'Choose a photo'}
        </label>
        <input
          style={{ display: 'none' }}
          id="photo"
          ref={editAtachementInput}
          onChange={() => {
            onFileChange(setCurrentPhoto, editAtachementInput, setImageEdit)
          }}
          type="file"
          accept="image/*"
        />
        {imageEdit &&
          imageEdit !== '' &&
          nweetObj.atachementURL &&
          nweetObj.atachementURL !== '' && (
            <>
              <button onClick={clickToRemoveImage}>Remove photo</button>
              <br></br>
              <br></br>
            </>
          )}
        <input
          value={nweetUpdate}
          onChange={editTweetInput}
          placeholder="Edit this nweet"
        />
        <br></br>
        <input
          style={{ color: 'green', fontSize: '17px', marginTop: '5px' }}
          type="submit"
          value="Save"
        />
      </form>
      <button
        style={{
          color: 'red',
          height: '25px',
          margin: '0px 15px 5px 0px',
          fontSize: '15px',
        }}
        onClick={toogleEditing}>
        Cancel Edit
      </button>
    </div>
  )
}

export default EditingNweet
