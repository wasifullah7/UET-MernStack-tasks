import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import { handleerror, handlesuccess } from '../utils'
import axios from 'axios'

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  })

const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;  
    const copysignupData = {...signupData};
    copysignupData[name] = value;
    setSignupData(copysignupData);
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupData;
    if (!username || !email || !password) {
      toast.error('Please fill all the fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', signupData);
      if (response.data.success) {
        handlesuccess(response.data.message);
        setTimeout(() => {
          navigate('/login'), 1000});
        setSignupData({ username: '', email: '', password: '' });
        // console.log('Signup successful:', response.data);
      } else {
        handleerror(response.data.message);
      }
    }
    catch (error) {
    const validationError = error.response?.data?.error;
    if(validationError)
    {
      handleerror(validationError[0].message);
    }
    else{
      handleerror(error.response.data.message);
    }
      
    } 
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className="px-18 py-45 bg-white border-2 rounded-2xl shadow-2xl shadow-black w-full max-w-md">
        <h1 className='text-4xl mb-5'>Signup</h1>
        <form action="" onSubmit={handleSignup} className='flex flex-col gap-4'>
          <div>
            <label htmlFor="username" className='text-2xl'>Username</label>
            <input onChange={handleChange} type="text" id="username" name="username" value={signupData.username} placeholder='Enter Your Name' autoFocus className='w-full text-xl p-2.5 outline-none border-b-2 border-b-black'/>
          </div>
          <div>
            <label htmlFor="email" className='text-2xl'>Email</label>
            <input onChange={handleChange} type="email" id="email" name="email" value={signupData.email} placeholder='Enter Your Email' className='w-full text-xl p-2.5 outline-none border-b-2 border-b-black'/>
          </div>
          <div>
            <label htmlFor="password" className='text-2xl'>Password</label>
            <input onChange={handleChange} type="password" id="password" name="password" value={signupData.password} placeholder='Enter Your Pasword' className='w-full text-xl p-2.5 outline-none border-b-2 border-b-black'/>
          </div>
          <button type="submit" className='bg-blue-500 text-2xl text-white rounded-3xl mx-2.5 p-2.5 cursor-pointer'>SignUp</button>
          <span>Already have an account ?
            <Link to="/login" className='text-blue-700 underline ml-1'>Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup
