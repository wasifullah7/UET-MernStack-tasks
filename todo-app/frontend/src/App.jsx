import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import EmailVerify from './pages/EmailVerify'
import ResetPass from './pages/ResetPass'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/todo' element={<Home/>} />
        <Route path='/' element={<LogIn/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-pass' element={<ResetPass/>} />
      </Routes>
    </div>
  )
}

export default App
