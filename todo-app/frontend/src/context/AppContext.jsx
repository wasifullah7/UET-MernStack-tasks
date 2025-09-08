import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children })=> {
  axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[isLoggedIn,setIsLoggedIn] = useState(false)
    const[userData,setUserData] = useState(false)

    const getuserAuth = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/auth/isAuth')
            if(data){
                setIsLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            console.error('Error fetching user data:', error.response?.data?.message || error.message);
        }
    }
    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/userdata')
            data ? setUserData(data.userData) : console.error(data?.message || 'Failed to retrieve user data.');
        } catch (error) {
             console.error('Error fetching user data:', error.response?.data?.message || error.message);
        }
    }

    useEffect(()=>{
        getuserAuth()
    },[])
    const value = {
        backendUrl,userData,setIsLoggedIn,setUserData,isLoggedIn,getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
