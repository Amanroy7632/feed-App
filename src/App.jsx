import {  Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { useState } from 'react'
import LandingPage from './components/Landingpage/LandingPage'
import Navbar from './components/navbar/Navbar'
import Home from './components/Landingpage/Home'
import Profile from './components/profile/Profile'
import AdminDashboard from './components/Admin/AdminDashboard'
import Users from './components/Admin/Users'
import AboutCompany from './components/aboutcompany/AboutCompany'
function App() {
  return (
     <>
     <Navbar />
     <Routes>
         <Route  path='' element={<Home/>}/>
         <Route  path='/login' element={<Login/>}/>
         <Route  path='/register' element={<Signup/>}/>
         <Route path='/feed' element={<LandingPage/>} />
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
           <Route path='/about' element={<AboutCompany/>}/>
          
     </Routes>
     </>
    
   
  )
}
export default App


