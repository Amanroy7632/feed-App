import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [alertMessage,setAlertMessage] =useState('')
  const [currentUser,setCurrentUser]=useState({})
  const [posts, setPost] = useState([]);
  useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem("userInfo"))
    if (localStorageData) {
      setUserData(localStorageData)
    }
    const localStoragePosts = JSON.parse(localStorage.getItem("posts"));
    if (localStoragePosts) {
      setPost(localStoragePosts);
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
  };
  const getUserData=(data)=>{
      const filteredData = userData?.filter(user=>user.email===data.email && user.password===data.password)
      return filteredData
  }
  const onClose = ()=>{
    setAlertMessage('')
  }
  return (
    <UserContext.Provider value={{ userData, registerUser,getUserData,alertMessage,setAlertMessage,onClose,currentUser,setCurrentUser,posts,setPost }}>
      {children}
    </UserContext.Provider>
  );
};
