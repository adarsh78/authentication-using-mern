import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../toastMessage.js";


const SignUp = () => {

  const navigate = useNavigate();

  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = {...signUpInfo};
    copySignupInfo[name] = value;
    setSignUpInfo(copySignupInfo);
  } 

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if(!name || !email || !password){
      return handleError("name, email and password are required");
    }

    try {
      const url = "http://localhost:5001/auth/signup"
      const response = await fetch(url , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpInfo)
      });

      const result = await response.json();
      const { message, success, error } = result;
      if(success){
        handleSuccess(message)
        setTimeout(() => {
          navigate("/login")
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
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                    type='text'
                    placeholder='Enter you name here...'
                    name='name'
                    value={signUpInfo.name}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                    type='email'
                    placeholder='Enter you email here...'
                    name='email'
                    value={signUpInfo.email}
                    onChange={handleChange}        
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    placeholder='Enter your password here'
                    name='password'
                    value={signUpInfo.password}
                    onChange={handleChange}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
  )
}

export default SignUp