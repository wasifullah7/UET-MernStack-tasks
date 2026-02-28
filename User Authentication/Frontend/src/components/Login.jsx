import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import { handleerror, handlesuccess } from '../utils'
import axios from 'axios'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;  
    const copyloginData = {...loginData};
    copyloginData[name] = value;
    setLoginData(copyloginData);
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.error('Please fill all the fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/auth/login', loginData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('loggedinuser', response.data.user.username);
        handlesuccess(response.data.message);
        setTimeout(() => {
          navigate('/home'), 1000});
        setLoginData({ email: '', password: '' });
        // console.log('Login successful:', response.data);
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
        <h1 className='text-4xl mb-5'>Login</h1>
        <form action="" onSubmit={handleLogin} className='flex flex-col gap-4'>
          <div>
            <label htmlFor="email" className='text-2xl'>Email</label>
            <input onChange={handleChange} type="email" id="email" name="email" value={loginData.email} placeholder='Enter Your Email' className='w-full text-xl p-2.5 outline-none border-b-2 border-b-black'/>
          </div>
          <div>
            <label htmlFor="password" className='text-2xl'>Password</label>
            <input onChange={handleChange} type="password" id="password" name="password" value={loginData.password} placeholder='Enter Your Pasword' className='w-full text-xl p-2.5 outline-none border-b-2 border-b-black'/>
          </div>
          <button type="submit" className='bg-blue-500 text-2xl text-white rounded-3xl mx-2.5 p-2.5 cursor-pointer'>Login</button>
          <span>Don't have an account ?
            <Link to="/signup" className='text-blue-700 underline ml-1'>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
