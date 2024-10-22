import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../toastMessage.js";


const Login = () => {

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  } 

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if(!email || !password){
      return handleError("email and password are required");
    }

    try {
      const url = "https://authentication-using-mern-api.vercel.app/auth/login"
      const response = await fetch(url , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { message, success, error, name, jwtToken } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name)
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      }
      else if(error) {
        const details = error?.details[0].message;
        handleError(details)
      }
      else if(!success){
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                    type='email'
                    placeholder='Enter you email here...'
                    name='email'
                    value={loginInfo.email}
                    onChange={handleChange}        
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    placeholder='Enter your password here'
                    name='password'
                    value={loginInfo.password}
                    onChange={handleChange}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account?
                    <Link to="/signup">SignUp</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
  )
}

export default Login
