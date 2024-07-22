import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./commonUI/Input";
import Button from "./commonUI/Button";
import DropDown from "./commonUI/DropDown";

import fs from "fs"
import { useUser } from "../../context/userContext";
// import useUser from "../../context/userContext";
const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const {registerUser,userData} =useUser()
  const createUser = (data) => {
    // fs.write("../../../public/data",data)
    console.log(data);
    // console.log(userData);
    // localStorage.setItem("userInfo",JSON.stringify(data))
    // const localData = localStorage.getItem("userInfo")
    // console.log(localData);
    registerUser(data)
    console.log(userData);

  };
  return (
    <div className=" flex justify-center items-center ">
      <div
        className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className=" mb-2 flex justify-center">
          <span className=" inline-block w-full max-w-[100px]">logo</span>
        </div>
        <h2 className=" text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className=" mt-2 text-center text-base text-gray-500 ">
          Already hav an account?&nbsp;
          <Link
            to={"/"}
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
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
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
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <DropDown label={"Role"} {...register("role",{
                required:true
            })}/>

            <Button type="submit" className=" w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
