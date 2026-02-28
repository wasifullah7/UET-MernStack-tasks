import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handlesuccess } from '../utils/'
import {ToastContainer} from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedinuser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedinuser')
    setLoggedInUser('')

    handlesuccess("Logged out successfully")
    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 1000)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className="px-18 py-45 bg-white border-2 rounded-2xl shadow-2xl shadow-black w-full max-w-md">
        <h1 className='text-4xl mb-5'>Welcome <strong>{loggedInUser}</strong></h1>
        <button onClick={handleLogout} className='bg-blue-500 text-2xl text-white rounded-3xl w-full p-2.5 cursor-pointer'>Logout</button>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Home
