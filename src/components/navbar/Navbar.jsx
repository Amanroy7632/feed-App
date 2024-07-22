import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({userInfo}) => {
    const [profileVisible,setProfileVisible] =useState(false)
    const mouseOverHandler =()=>{
        setProfileVisible(true)
    }
    const mouseLeaveHandler = ()=>{
        setProfileVisible(false)
    }
  return (
    <nav className=' flex justify-center items-center h-[10%] w-full'>
      <div className='container flex justify-between px-20 py-3'>
      <div><p className=' text-2xl font-bold'><span className=' text-red-500'>F</span><span className=' text-blue-500'>E</span><span className=' text-green-500'>E</span><span className=' text-orange-500'>D</span></p></div>
      <div>
        <div className=' relative'>{userInfo.name?<p onMouseOver={mouseOverHandler} className=' border text-xl rounded-full'>👤 {userInfo.name}</p>:<Link to={"/login"} className=' text-xl'>Login</Link>}
       { profileVisible&&<div onMouseLeave={mouseLeaveHandler} className=' absolute border w-3/4 flex justify-center items-center flex-col'>
            <ul className=' px-5 '>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link to={"/profile"}>Profile</Link></li>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link to={"/post"}>Posts</Link></li>
                <li onClick={mouseLeaveHandler} className=' underline-offset-1 hover:underline hover:text-blue-400 text-xl'><Link to={"/currentuser-about"}>About</Link></li>
            </ul>
        </div>}
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
