import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/userContext'
import Alert from '../customalert/Alert'

const Navbar = () => {
    const [profileVisible,setProfileVisible] =useState(false)
    const {currentUser,setCurrentUser,alertMessage,setAlertMessage,onClose} = useUser()
    const mouseOverHandler =()=>{
        setProfileVisible(true)
    }
    const mouseLeaveHandler = ()=>{
        setProfileVisible(false)
    }
    const logoutHandler = ()=>{
        console.log(currentUser.name);
        setCurrentUser({})
        setAlertMessage("Logout Sucessfully..")
    }
  return (
    <nav className=' flex justify-center items-center h-[10%] w-full border-b-2 shadow-md'>
      <div className='container flex justify-between px-20 py-3'>
      <div><p className=' text-2xl font-bold'><span className=' text-red-500'>F</span><span className=' text-blue-500'>E</span><span className=' text-green-500'>E</span><span className=' text-orange-500'>D</span></p></div>
      <div className=' flex justify-center items-center'>
        <ul className=' flex justify-between items-center gap-4 text-xl'>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/feed"}>Feeds</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            {currentUser.email && currentUser.role==="2"&&<li><Link to={"/admin-dashboard"}>Dashboard</Link></li>}
        </ul>
      </div>
      <div>
        <div className=' relative'>{currentUser?.name?<p onMouseOver={mouseOverHandler} className=' border border-b-0 text-xl rounded-t-xl'>👤 {currentUser.name}</p>:<Link to={"/login"} className=' text-xl'>Login</Link>}
       { profileVisible&&<div onMouseLeave={mouseLeaveHandler} className=' absolute border border-t-0 w-full rounded-b-md flex justify-center items-center flex-col backdrop-blur-md'>
            <ul className=' px-5 '>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link to={"/profile"}>Profile</Link></li>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link to={"/post"}>Posts</Link></li>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link to={"/currentuser-about"}>About</Link></li>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link onClick={logoutHandler}>Logout</Link></li>
            </ul>
        </div>}
        </div>
      </div>
      </div>
    {alertMessage && <Alert message={alertMessage} onClose={onClose} />}
    </nav>
  )
}

export default Navbar
