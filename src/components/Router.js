import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from '../routes/Profile'
import Navigation from './Navigation'

const AppRouter = ({isLoggedIn}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        <>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
            </>
          ) : (
            <>
              <Route exact path="/" element={<Auth />}></Route>
              <Route exact path="*" element={<Navigate to="/" />} />
            </>
          )}
        </>
      </Routes>
    </Router>
  )
}

export default AppRouter
