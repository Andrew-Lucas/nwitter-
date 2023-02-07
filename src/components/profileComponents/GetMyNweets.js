import React from 'react'

const GetMyNweets = ({myNweets}) => {
  return (
    <>
      <h2>My Nweets</h2>
      <div>
        {myNweets.map((myNweet) => {
          return (
            <div key={myNweet.createdAt}>
              {myNweet.atachementURL && myNweet.atachementURL !== '' && (
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

export default GetMyNweets