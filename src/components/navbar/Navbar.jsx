import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import Alert from "../customalert/Alert";
import Logo from "../logo/Logo";

const Navbar = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [toggle,setToggle] =useState(false)
  const {
    currentUser,
    setCurrentUser,
    alertMessage,
    setAlertMessage,
    onClose,
  } = useUser();
  const navigate = useNavigate();
  const mouseOverHandler = () => {
    setProfileVisible(true);
  };
  const mouseLeaveHandler = () => {
    setProfileVisible(false);
  };
  const logoutHandler = () => {
    console.log(currentUser.name);
    setCurrentUser({});
    setAlertMessage("Logout Sucessfully..");
    navigate("/");
  };
  const hamburgClickHandler = ()=>{
    setToggle(!toggle)
  }
  return (
    <nav className=" fixed flex justify-center items-center h-[10%] w-full border-b-2 shadow-md bg-gray-200">
      <div className="container flex justify-between lg:px-20 py-3 max-sm:px-3 ">
        <Logo/>
        <div className=" lg:flex justify-center items-center md:hidden sm:hidden max-sm:hidden ">
          <ul className=" flex justify-between items-center gap-4 text-xl font-semibold select-none">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/feed"}>Feeds</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            {currentUser.email && currentUser.role === "2" && (
              <li>
                <Link to={"/admin-dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <div className=" relative flex gap-6 select-none">
            {currentUser?.name ? (
              <p
                onMouseOver={mouseOverHandler}
                className=" border border-b-0 text-xl rounded-t-xl"
              >
                👤 {currentUser.name}
              </p>
            ) : (
              <Link to={"/login"} className=" text-xl font-semibold">
                Login
              </Link>
            )}
            {profileVisible && (
              <div
                onMouseLeave={mouseLeaveHandler}
                className=" absolute top-[4vh] z-50 border border-t-0 w-full h-[30vh]  rounded-b-md flex justify-center items-center flex-col backdrop-blur-md"
              >
                <ul className=" px-5 text-2xl select-none ">
                  <li
                    onClick={mouseLeaveHandler}
                    className=" underline-offset-1 hover:underline hover:text-blue-400 "
                  >
                    <Link to={"/profile"}>Profile</Link>
                  </li>
                  <li
                    onClick={mouseLeaveHandler}
                    className=" underline-offset-1 hover:underline hover:text-blue-400 "
                  >
                    <Link to={"/post"}>Posts</Link>
                  </li>
                  <li
                    onClick={mouseLeaveHandler}
                    className=" underline-offset-1 hover:underline hover:text-blue-400"
                  >
                    <Link to={"/currentuser-about"}>About</Link>
                  </li>
                  <li
                    onClick={mouseLeaveHandler}
                    className=" underline-offset-1 hover:underline hover:text-red-400"
                  >
                    <Link onClick={logoutHandler}>Logout</Link>
                  </li>
                </ul>
              </div>
            )}
            <div onClick={hamburgClickHandler} className=" flex flex-col gap-1 lg:hidden">
              <span className=" bg-black w-[25px] h-[6px] rounded-sm"></span>
              <span className=" bg-black w-[25px] h-[6px] rounded-sm"></span>
              <span className=" bg-black w-[25px] h-[6px] rounded-sm"></span>
            </div>
          </div>
        </div>
        {toggle&&<div className=" fixed w-2/3 z-20 h-[70vh] top-[7vh] backdrop-blur-md right-0 ">
        <div className="flex justify-between flex-col items-center">
        <ul className=" flex flex-col   gap-4 text-3xl font-semibold  pt-10 select-none ">
            <li>
              <Link to={"/"} onClick={hamburgClickHandler}>Home</Link>
            </li>
            <li>
              <Link to={"/feed"} onClick={hamburgClickHandler}>Feeds</Link>
            </li>
            <li>
              <Link to={"/about"} onClick={hamburgClickHandler}>About</Link>
            </li>
            {currentUser.email && currentUser.role === "2" && (
              <li>
                <Link to={"/admin-dashboard"} onClick={hamburgClickHandler}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        </div>}
      </div>
      {alertMessage && <Alert message={alertMessage} onClose={onClose} />}
    </nav>
  );
};

export default Navbar;
