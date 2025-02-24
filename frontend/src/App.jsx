import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { useThemeStore } from './store/useThemeStore.js'


function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
 const {theme}=useThemeStore()

 console.log({onlineUsers});

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  // console.log(authUser)

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )


  return (
    <div data-theme={theme} className='h-screen overflow-y-scroll'>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage/>: <Navigate to="/login"/>}/>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/settings' element={<SettingsPage />}/>
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ?<LoginPage /> : <Navigate to="/"/>}/>
      </Routes>
      
      <Toaster />
    </div>
  )
}

export default App