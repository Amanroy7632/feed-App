import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Users from "./Users";
import { useUser } from "../../context/userContext";
import Approval from "./Approval";
import  {BiSolidDashboard,BiUser,BiRupee,BiCoin,BiCross,BiArrowToRight} from "react-icons/bi"
const AdminDashboard = () => {
    const {userData,posts,currentUser} = useUser()
    const [displayNumber,setDisplayNumber] =useState(0)
    const [activeUserPannel,setActiveUserPannel] =useState(false)
    const [activeApprovalPannel,setActiveApprovalPannel] =useState(false)
    const navigate=useNavigate()
    const approvedPost = ()=>{
        const count = posts.filter(post => post.isApproved).length
        return count
    }
    const unApprovedPost = ()=>{
        const count = posts.filter(post => !post.isApproved).length
        return count
    }
    const nextStep = ()=>{
        if (displayNumber<2) {
            setDisplayNumber(displayNumber+1)
        }
    }
    useEffect(()=>{
       if(!currentUser || currentUser?.role!=="2"){
        navigate("/")
       }
    },[currentUser])
  return (
    <div className=" pt-[10vh] flex max-sm:flex-col max-sm:overflow-y-scroll h-screen overflow-hidden">
      <Sidebar setActiveUserPannel={setActiveUserPannel} activeUserPannel={activeUserPannel} setActiveApprovalPannel={setActiveApprovalPannel} activeApprovalPannel={activeApprovalPannel}  />
      <div className="flex-grow">
        <div className="p-6 border max-sm:p-2">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-1"><BiSolidDashboard/>Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-sm:gap-1 max-sm:grid-cols-2">
            <div className="bg-white p-4 rounded shadow max-sm:p-1">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-1"><BiUser className=" text-blue-600"/>Users</h2>
              <p>Number of users: {userData?.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow max-sm:p-1">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-1"><BiCoin className=" text-yellow-500"/>Revenue</h2>
              <p>Total revenue: ${userData?.length*100}</p>
            </div>
            <div className="bg-white p-4 rounded shadow max-sm:p-1">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-1"><BiArrowToRight/>Unapproved Posts</h2>
              <p>Number of posts: {unApprovedPost()}</p>
            </div>
            <div className="bg-white p-4 rounded shadow max-sm:p-1">
              <h2 className="text-xl font-semibold mb-2">✔️Approved Posts</h2>
              <p>Number of approved posts: {approvedPost()}</p>
            </div>
          </div>
        </div>
        <div>
            {
                activeUserPannel && <Users userData={userData}/>
            }
            {
                activeApprovalPannel&& <Approval/>
            }
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
