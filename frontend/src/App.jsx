import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import SignUp from "./Pages/SignUp"

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