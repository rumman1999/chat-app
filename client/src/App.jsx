// import { useState } from 'react'
import './App.css'
import {Routes , Route, Navigate, useLocation } from "react-router-dom"
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext'
import Home from './pages/Home'

function App() {
  const {user} = useContext(AuthContext)
  // console.log(user)

  const location = useLocation();
  
  // Determine whether the Navbar should be shown based on the current route
  const showNavbar = location.pathname !== '/';

  return (
    <ChatContextProvider user={user}>
    {showNavbar && <Navbar />}
    <div className='main-container'>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chat" element={user ? <Chat/> : <Login/>}/>
      <Route path="/register" element={user ? <Chat/> : <Register/>}/>
      <Route path="/login" element={user ? <Chat/> : <Login/>}/>      
      <Route path='*' element={<Navigate to="/"/>}/>
    </Routes>
    </div>
    </ChatContextProvider>
  )
}

export default App
