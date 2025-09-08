import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate()
  const {userData,setUserData,backendUrl,setIsLoggedIn} = useContext(AppContext)

  const sendVerifyOtp = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/sendOtp')
      if(data){
        navigate('/email-verify')
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  }

  const logOut = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data && setIsLoggedIn(false)
      data && setUserData(null)
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  }

  // console.log("Navbar userData:", userData);

  
  return (
    <div className=" flex items-center justify-center ">
      <div className="w-[1280px] flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold font-serif ">Shabir<span className="text-emerald-500 font-mono">Dev</span></h2>
        {userData ? (
          <div className="border px-3 cursor-pointer py-1 font-semibold bg-emerald-600 text-white relative group rounded-full">
            {userData?.name?.[0]?.toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded  pt-10">
              <ul className="list-none m-0 p-2 bg-gray-400 text-sm">
             {!userData.isAccountverified  &&  <li onClick={sendVerifyOtp} className="py-1 px-2 hover:bg-emerald-300">Verify Email</li>}
                <li className="py-1 px-2 hover:bg-emerald-300" onClick={()=>logOut()}>LogOut</li>
              </ul>
            </div>
          </div>
        ) : (<button onClick={()=>navigate('/')} className="border px-3 cursor-pointer py-1 font-semibold bg-gray-100 rounded-full">LogIn</button>)}
      </div>
    </div>
  );
};

export default Navbar;
