"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {

    const {data: session}: any = useSession();

    return (
        <div className="">
            <ul className="flex gap-4 items-center p-4 ">
            <div>
                <Link href="/"><li>Home</li></Link>
            </div>
            <div className="flex gap-4 items-center p-4 ">
                <Link href="/dashboard"><li>Dashboard</li></Link>
                {!session ? (
                    <>
                    <Link href="/login"><li>Login</li></Link>
                
                 <Link href="/register"><li>Register</li></Link>
                    </>
                    
                
                ): (
                    <>
                    {session.user?.email}
                        <li>
                            <button onClick={() => {
                                signOut();
                            }} className="p-2 px-5 mt-1 bg-blue-800 rounded-full">Logout</button> 
                        </li>
                    </>
                )}
            </div>
            
            </ul>
            
        </div>
    );
}

export  default Navbar;
