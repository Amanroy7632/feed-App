import React from 'react';
import { Link } from 'react-router-dom';
import {BiUser,BiSolidDashboard,BiArchive} from "react-icons/bi"
const Sidebar = ({activeUserPannel,setActiveUserPannel,activeApprovalPannel,setActiveApprovalPannel}) => {
    const handleClick =()=>{
        setActiveUserPannel(true)
        setActiveApprovalPannel(false)
    }
    const handleApprovalClick =()=>{
        setActiveUserPannel(false)
        setActiveApprovalPannel(true)
    }
    const dashBoardHandler = ()=>{
      setActiveUserPannel(false)
        setActiveApprovalPannel(false)
    }

  return (
    <div className="w-64 max-sm:w-full max-sm:h-[30vh] top-0 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <nav className="flex flex-col p-4">
        <div  className="mb-2 p-2 bg-gray-700 rounded flex gap-2 items-center cursor-pointer" onClick={dashBoardHandler}> <BiSolidDashboard/>Dashboard</div>
        <div onClick={handleClick} className="mb-2 p-2 bg-gray-700 rounded flex gap-2 items-center cursor-pointer"><BiUser/><span>Users</span></div>
        <div onClick={handleApprovalClick}  className="mb-2 p-2 bg-gray-700 rounded flex gap-2 items-center cursor-pointer"><BiArchive/>Approval Request</div>
        
      </nav>
    </div>
  );
};

export default Sidebar;
