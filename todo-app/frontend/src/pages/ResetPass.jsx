import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(0);
  const otpRefs = useRef([]);
  const [newPassword, setNewPassword] = useState('');
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
 const handleEmailSubmit = async () => {
  if (!email) return alert('Enter your email');

  try {
    const res = await axios.post(`${backendUrl}/api/auth/resetOtp`, { email });
    alert(res.data.message); // Show backend message (OTP sent or error)
    if (res.data.message?.toLowerCase().includes('otp')) {
      setStep(2);
    }
  } catch (err) {
    alert("Something went wrong");
  }
};


 const handleOtpSubmit = () => {
  const enteredOtp = otpRefs.current.map(input => input.value).join('');
  if (enteredOtp.length !== 6) return alert('Enter 6-digit OTP');
  setOtp(enteredOtp); // Store to send in password step
  setStep(3);
};


 const handlePasswordSubmit = async () => {
  if (newPassword.length < 6) return alert('Password too short');

  try {
    const res = await axios.post(`${backendUrl}/api/auth/resetPass`, {
      email,
      otp,
      newPass: newPassword
    });
    alert(res.data.message);

    if (res.data.message?.toLowerCase().includes('success')) {
      navigate('/')
    }
  } catch (err) {
    alert("Error resetting password");
  }
};


  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-5 text-center">Reset Your Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleEmailSubmit}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-emerald-600"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2>
          <div className="flex justify-center gap-3 mb-4">
            {Array(6).fill().map((_, i) => (
              <input
                key={i}
                maxLength="1"
                ref={(el) => otpRefs.current[i] = el}
                className="w-10 h-10 text-center border rounded-md text-lg"
              />
            ))}
          </div>
          <button
            onClick={handleOtpSubmit}
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Set New Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handlePasswordSubmit}
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPass;
