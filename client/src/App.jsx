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
import Test from './pages/Test'

function App() {
  const {user} = useContext(AuthContext)

  const location = useLocation();
  
  // Determine whether the Navbar should be shown based on the current route
  const showNavbar = location.pathname !== '/';
  

  return (
    <ChatContextProvider user={user}>
    {showNavbar && <Navbar />}
    <div className='main-container'>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/login" element={ <Login/>}/>      
      <Route path='*' element={<Navigate to="/"/>}/>
      <Route path='/test' element={<Test/>}/>
    </Routes>
    </div>
    </ChatContextProvider>
  )
}

export default App
