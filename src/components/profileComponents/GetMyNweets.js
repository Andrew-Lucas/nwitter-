import React from 'react'

const GetMyNweets = ({ myNweets }) => {
  return (
    <>
      <h2>My Nweets</h2>
      <div>
        {myNweets.map((myNweet) => {
          return (
            <div
              key={myNweet.createdAt}
              style={{
                borderTop: 'solid 1px lightgrey',
                margin: '7px 0px',
                padding: '5px',
              }}>
              <span>{myNweet.nweet}</span>
              <br></br>
              {myNweet.atachementURL && myNweet.atachementURL !== '' && (
                <img
                  alt=""
                  src={myNweet.atachementURL}
                  height="100"
                  width="100"
                />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default GetMyNweets
