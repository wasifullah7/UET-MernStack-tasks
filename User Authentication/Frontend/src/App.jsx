import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
      <ToastContainer />
    </div>    
  )
}

export default App
