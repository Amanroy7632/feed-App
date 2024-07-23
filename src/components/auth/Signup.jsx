import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./commonUI/Input";
import Button from "./commonUI/Button";
import DropDown from "./commonUI/DropDown";
import { useUser } from "../../context/userContext";
import {
  isValidPhonenumber,
  checkPasswordLength,
} from "../../validation/validation";
import Alert from "../customalert/Alert";
import { BiEnvelope,BiCommand} from "react-icons/bi"
import {AiOutlineMan,AiFillEyeInvisible,AiOutlineEye,AiFillControl} from "react-icons/ai"
import {BsMenuApp,BsPhone} from "react-icons/bs"
const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const [err, setErr] = useState("");
  const [isPasswordVisible,setPasswordVisible] = useState(false)
  const {
    registerUser,
    userData,
    alertMessage,
    setAlertMessage,
    onClose,
    setCurrentUser,
  } = useUser();
  const navigate = useNavigate();

  const createUser = (data) => {
    console.log(data);
    if (!isValidPhonenumber(data.phone)) {
      setErr("Invalid Phone Number");
      setTimeout(() => {
        setErr("");
      }, 1500);
      return null;
    }
    if (!checkPasswordLength(data.password)) {
      setErr("Password is too weak.");
      return null;
    }
    registerUser(data);
    setAlertMessage("User registered successfully !");
    reset();
    setCurrentUser(data);
    navigate("/");
    console.log(userData);
  };
  const passwordToggleHandler =()=>{
    setPasswordVisible(!isPasswordVisible)
  }
  return (
    <div className=" flex justify-center items-center ">
      <div
        className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className=" mb-2 flex justify-center">
        <div><p className=' text-2xl font-bold'><span className=' text-red-500'>F</span><span className=' text-blue-500'>E</span><span className=' text-green-500'>E</span><span className=' text-orange-500'>D</span></p></div>
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className=" mt-2 text-center text-base text-gray-500 ">
          Already hav an account?&nbsp;
          <Link
            to={"/login"}
            className=" font-medium text-pretty transition-all duration-200 hover:underline "
          >
            Sign in
          </Link>
        </p>
        {err && <p className=" text-red-600 mt-8 text-center">{err}</p>}
        <form onSubmit={handleSubmit(createUser)}>
          <div className=" space-y-5">
            <Input
              label="Name"
              icon={<BsMenuApp/>}
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              icon={<BiEnvelope/>}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid email address",
                },
              })}
            />
            <Input
              label="Phone"
              type="number"
              icon={<BsPhone/>}
              placeholder="Enter your phone number"
              {...register("phone", {
                required: true,
                // validate:{
                //     matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||"Email address must be a valid email address"
                // }
              })}
            />
            <Input
              label="Password"
              type={isPasswordVisible?"text":"password"}
            icon={isPasswordVisible?<AiOutlineEye onClick={passwordToggleHandler} className=' cursor-pointer' />:<AiFillEyeInvisible onClick={passwordToggleHandler} className=' cursor-pointer'/>}
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <DropDown
              label={"Role"}
              icon={<AiFillControl/>}
              {...register("role", {
                required: true,
              })}
            />

            <Button type="submit" className=" w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
      {alertMessage && <Alert message={alertMessage} onClose={onClose} />}
    </div>
  );
};

export default Signup;
