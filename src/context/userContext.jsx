// import React,{createContext,useContext,useState} from "react";
// export const UserContext=createContext({
//     userData:[{
//         name:'',
//         email:"",
//         password:"",
//         role:"1",
//         phone:""
//     }],
//     registerUser:()=>{},
//     getUser:(email,password)=>{}
// })
// export const UserProvider = ({ children }) => {
//     const [userData, setUserData] = useState(null);
  
//     const registerUser = (data) => {
//       setUserData(data);
//     };
// // export const UserContextProvider=UserContext.Provider
// export default function useUser(){
//    return useContext(UserContext)
// }

import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [alertMessage,setAlertMessage] =useState('')
  useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem("userInfo"))
    if (localStorageData) {
      setUserData(localStorageData)
    }
  },[])
  
  const registerUser = (data) => {
    const localStorageData = JSON.parse(localStorage.getItem("userInfo")) || []
    if(userData.some(user=>user.email===data.email)){
      alert("User already registered")
      return
    }
    const updatedUserData = [...localStorageData,data]
    setUserData(updatedUserData);
    localStorage.setItem("userInfo",JSON.stringify(updatedUserData))
    const localStora = JSON.parse(localStorage.getItem("userInfo"))
    console.log(localStora);
    alert("User registered Successfully !")
  };
  const getUserData=(data)=>{
      const filteredData = userData?.filter(user=>user.email===data.email && user.password===data.password)
      return filteredData
  }
  const onClose = ()=>{
    setAlertMessage('')
  }
  return (
    <UserContext.Provider value={{ userData, registerUser,getUserData,alertMessage,setAlertMessage,onClose }}>
      {children}
    </UserContext.Provider>
  );
};
