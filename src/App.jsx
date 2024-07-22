import {  Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { useState } from 'react'
import LandingPage from './components/Landingpage/LandingPage'
import Navbar from './components/navbar/Navbar'
import Home from './components/Landingpage/Home'
import Profile from './components/profile/Profile'

function App() {
  const [currentUser,setCurrentUser]=useState({})
  return (
    
  
     <>
     <Navbar userInfo={currentUser}/>
     <Routes>
         <Route  path='' element={<Home currentUser={currentUser} />}/>
         <Route  path='/login' element={<Login setCurrentUser={setCurrentUser}/>}/>
         <Route  path='/register' element={<Signup/>}/>
         <Route path='/home' element={<LandingPage currentUser={currentUser} />} />
         <Route path='/profile' element={<Profile currentUser={currentUser}/>}/>
     </Routes>
     </>
    
   
  )
}
export default App


