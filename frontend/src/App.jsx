import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login"
import Home from "./Components/Home"
import SignUp from "./Components/SignUp"

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/signup' element={<SignUp />}/>
    </Routes>
    </>
  )
}

export default App