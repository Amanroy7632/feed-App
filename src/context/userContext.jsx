import { createContext, useContext, useEffect, useState } from "react";
import { getDataFromLocalStorage, saveToLocalStorage } from "../utility";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPost] = useState([]);
  useEffect(() => {
    // const localStorageData = JSON.parse(localStorage.getItem("userInfo"))
    const localStorageData = getDataFromLocalStorage("userInfo");
    if (localStorageData) {
      setUserData(localStorageData);
    }
    const localStoragePosts = getDataFromLocalStorage("posts");
    if (localStoragePosts) {
      setPost(localStoragePosts);
    }
  }, []);

  const registerUser = (data) => {
    const localStorageData = getDataFromLocalStorage("userInfo") || [];
    if (userData.some((user) => user.email === data.email)) {
      alert("User already registered");
      return;
    }
    const updatedUserData = [...localStorageData, data];
    setUserData(updatedUserData);
    // localStorage.setItem("userInfo",JSON.stringify(updatedUserData))
    const isSaved = saveToLocalStorage(updatedUserData, "userInfo");
    if (!isSaved) {
      alert("Something went wrong while saving data to the localstorage");
    }
    const localStora = JSON.parse(localStorage.getItem("userInfo"));
    console.log(localStora);
  };
  const getUserData = (data) => {
    const filteredData = userData?.filter(
      (user) => user.email === data.email && user.password === data.password
    );
    return filteredData;
  };
  const onClose = () => {
    setAlertMessage("");
  };
  const deletePost = (id) => {
    if (!currentUser.name) {
      setAlertMessage("Please login first");
      return;
    }
    const newUpdatePost = posts.filter((post) => {
      return post.id !== id;
    });
    setPost(newUpdatePost);
    localStorage.setItem("posts", JSON.stringify(newUpdatePost));
    // setAlertMessage("Post deleted successfully");
  };
  const updatePost = (postId, data) => {
    if (!data) {
      alert("Invalid post title");
      return null;
    }
    const currentPost = posts.filter((post) => post.id === postId);
    if (!currentPost) {
      alert("Post not found");
      return null;
    }
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, post: { post: data.newPost } };
      }
      return post;
    });
    const newArray = [...updated];
    setPost(newArray);
    localStorage.setItem("posts", JSON.stringify(updated));
    console.log(updated);
  };
  return (
    <UserContext.Provider
      value={{
        userData,
        registerUser,
        getUserData,
        alertMessage,
        setAlertMessage,
        onClose,
        currentUser,
        setCurrentUser,
        posts,
        setPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
