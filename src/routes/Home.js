import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("")
  const formSubmit = (event)=>{
    event.preventDefault()
/*     const {target} = event */
    console.log(event)
  }

  const inputChange = (event)=>{
    const {target:{value}} = event
    console.log(value)
    setNweet(value)
  }
  return (
    <div>
      <form onSubmit={formSubmit}>
        <input value={nweet} onChange={inputChange} type="text" placeholder="Whots on your mind?" />
        <button>Nweet</button>
      </form>
    </div>
  )
};

export default Home