"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const Login = ()=> {
   // const router = useRouter();
   const [error, setError] = useState("");
   const session = useSession();
   const  router= useRouter();
   useEffect(() => {
      if(session?.status === "authenticated" && router){
         router.replace("/dashboard");
      }
   },[session, router])

   const isValidEmail = (email: string) => {
      const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
  }
   const handleSubmit = async  (e:any) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password =  e.target[1].value;

      if(!isValidEmail(email)) {
          setError("Please enter a valid email address.");
          return;
      }

      if(!password || password.length < 8 ) {
          setError("Password must be at least 8 characters long.");
          return;
      }

      const res = await signIn("credentials",{
         redirect:false,
         email,
         password,
      })

      if(res?.error){
         setError("Invalid email or password");
         if(res?.url) router.replace("/dashboard");
      }else {
         setError("");
      } 

      
  }

   return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-center font-bold text-[25px]">Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label> <br />
          <input
            type="email"
            className="form-control w-full rounded px-3 py-3 text-black"
            placeholder="xyz@gmail.com"
            required
          />
          <br />
          <label>Password</label> <br />
          <input
            type="password"
            className="form-control w-full rounded px-3 py-3 text-black"
            placeholder="password"
            required
          />
          <br />
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center mt-4">
            Sign In
          </button>
          <p className=" text-red-600 text-[16px] mt-4">{error && error}</p>
        </form>
       
        <div className="text-center py-4">-OR-</div>
          <Link href="/register" className="text-center">New User Register here!</Link>
      </div>

    </div>
   );
}

export default  Login; 