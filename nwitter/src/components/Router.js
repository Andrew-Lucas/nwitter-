import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Profile from '../routes/Profile'
import Navigation from './Navigation'

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        <>
          {isLoggedIn ? (
            <>
              <Route
                exact
                path="/"
                element={<Home userObj={userObj} />}></Route>
              <Route
                exact
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }></Route>
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
