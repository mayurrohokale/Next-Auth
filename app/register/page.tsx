"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const isValidEmail = (email: string) => {
    const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();

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

        try {
            const res = await fetch("/api/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            })
            if(res.status === 400) {
                setError("This email is alerady registered");
            }
            if(res.status === 200){
                setError("");
                router.push("/login");
            }
        }catch(error){
            setError("Error, try again");
            console.log(error);
        }
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-center font-bold text-[25px]">Register</h1>
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
              Register
            </button>
            <p className="text-red text-[16px] mt-4">{error && error}</p>
          </form>
          <div className="text-center py-4">-OR-</div>
            <Link href="/login" className="text-center">Login with an expisting account</Link>
        </div>

      </div>
    );
  };
  
  export default Register;
  