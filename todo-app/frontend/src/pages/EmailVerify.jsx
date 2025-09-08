import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const { backendUrl, userData, getUserData, isLoggedIn } = useContext(AppContext);
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (e.inputType === "insertFromPaste") {
      const pastedValue = e.target.value.split('');
      pastedValue.forEach((char, idx) => {
        if (idx < inputs.current.length) {
          inputs.current[idx].value = char;
        }
      });
      const nextEmptyInput = inputs.current.find(input => input.value === '');
      if (nextEmptyInput) {
        nextEmptyInput.focus();
      }
    } else if (value.match(/[0-9]/)) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !inputs.current[index].value) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otp = inputs.current.map(input => input.value).join('');

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const {data} = await axios.post(
        `${backendUrl}/api/auth/verifyEmail`,
        { otp },
        { withCredentials: true } 
      );

      if (data) {
        alert("Email verified successfully!");
        getUserData();
        // console.log("Response:", res.data);
        navigate('/todo')
      } else {
        alert(res.data.message || "Verification failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during verification");
    }
  };

  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountverified && navigate('/todo')
  },[isLoggedIn,userData])

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Email Verification</h2>
      <p className="text-sm text-gray-700 text-center mb-8">Enter the OTP sent to your email</p>

      <div className="flex justify-center gap-4 mb-8">
        {Array(6).fill().map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(el) => inputs.current[index] = el}
            className="w-14 h-14 text-xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default EmailVerify;
