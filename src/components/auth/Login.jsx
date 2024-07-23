import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from './commonUI/Input'
import Button from './commonUI/Button'
import { useUser } from '../../context/userContext'
import Alert from '../customalert/Alert'
import {BiEnvelope} from "react-icons/bi"
import {AiFillEyeInvisible,AiOutlineEye} from "react-icons/ai"
const Login = () => {
    const [errorMessage,setErrorMessage] =useState('')
    const {register,handleSubmit} = useForm()
    const {getUserData,alertMessage,setAlertMessage,onClose,setCurrentUser} =useUser()
    const [isPasswordVisible,setPasswordVisible] = useState(false)
    const navigate =useNavigate()
    const login = (data)=>{
      if (!data) {
        setErrorMessage("All fields are required")
        setAlertMessage("All fields are required")
      }
        const localUserData =JSON.parse(localStorage.getItem("userInfo"))||[]
        console.log(localUserData);
        if (localUserData.length<=0) {
          // alert("Something went wrong with storage")
          setAlertMessage("Something went wrong with storage")
          return
        }
       const user= localUserData.filter((user)=>{
          return user.email===data.email && user.password===data.password
        })
        console.log(user);
        if (user.length===1) {
          setCurrentUser(user[0])
          // alert(`Login Successfully \nWelcome ${user[0]?.name}`)
          setAlertMessage(`Login Successfully \nWelcome ${user[0]?.name}`)
          if (user[0].role==="2") {
            navigate("/admin-dashboard")
          }else{

            navigate("/")
          }
        }else{
          setErrorMessage("Invalid Credentials,please try again")
          setAlertMessage("Invalid Credentials,please try again")
        }    
        
    }
    useEffect(()=>{
      if (errorMessage) {
        setTimeout(()=>{
          setErrorMessage('')
        },2000)
      }
    },[errorMessage])
    const passwordToggleHandler =()=>{
      setPasswordVisible(!isPasswordVisible)
    }
  return (
    <div className=" flex items-center justify-center w-full  pt-3">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}>
        <div className=" mb-2 flex justify-center">
        <div><p className=' text-2xl font-bold'><span className=' text-red-500'>F</span><span className=' text-blue-500'>E</span><span className=' text-green-500'>E</span><span className=' text-orange-500'>D</span></p></div>
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className=" mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link to={"/register"} className=" font-medium text-pretty transition-all duration-200 hover:underline ">
          Sign Up
          </Link>
        </p>
        {errorMessage && <p className=" text-red-600 mt-8 text-center" >{errorMessage}</p>}
        <form onSubmit={handleSubmit(login)} className=" mt-8 ">
           <div className=" space-y-5">
            <Input
            label="Email"
            icon={<BiEnvelope/>}
            placeholder="Enter your email"
            type="email"
            {...register("email",
            {
              required:true,
              // validate:{
              //   matchPatern:(value)=>/^/.test(value) || "Email address must be a valid address"
              // }
            })}
            />
            <Input
            label="Password"
            type={isPasswordVisible?"text":"password"}
            icon={isPasswordVisible?<AiOutlineEye onClick={passwordToggleHandler} className=' cursor-pointer' />:<AiFillEyeInvisible onClick={passwordToggleHandler} className=' cursor-pointer'/>}
            placeholder="Enter your password"
            {...register("password",{
              required:true,
            })} />
            <Button
             type="submit" 
            className=" w-full" >Sign in</Button>
           </div>
        </form>

      </div>
      {
        alertMessage && <Alert message={alertMessage} onClose={onClose}/>
      }
    </div>
  )
}

export default Login
