import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
const LogIn = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send cookies also
    axios.defaults.withCredentials = true
    try {
      if (state === "signup") {
        const { data } =await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data) {
          setIsLoggedIn(true);
          getUserData()
          navigate("/todo");
        } else {
          alert(data.message);
        }
      } else {
        const { data } =await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data) {
          setIsLoggedIn(true);
          getUserData()
          navigate("/todo");
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
          {state === "signup" ? "Create Account" : "Log In"}
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          {state === "signup"
            ? "Create Your Account"
            : "Log in to your account"}
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {state === "signup" && (
            <input
              type="text"
              required
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800"
            />
          )}
          <input
            type="email"
            required
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800"
          />
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50 text-gray-800"
          />
          {state !== "signup" && (
            <p
              onClick={() => navigate("/reset-pass")}
              className="text-right text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Forget password?
            </p>
          )}
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition font-semibold"
          >
            {state === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>
        {msg && <div className="text-center text-red-500 mt-2">{msg}</div>}

        <div className="mt-6 text-center text-gray-600">
          {state === "signup" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  setState("login");
                  setMsg("");
                }}
              >
                Log In here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => {
                  setState("signup");
                  setMsg("");
                }}
              >
                Sign Up here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
