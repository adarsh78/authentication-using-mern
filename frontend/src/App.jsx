import React, { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import SignUp from "./Pages/SignUp"
import RefreshHandler from './Component/RefreshHandler';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login"/>
  }


  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<PrivateRoute element={<Home />}/>}/>
    </Routes>
    </>
  )
}

export default App