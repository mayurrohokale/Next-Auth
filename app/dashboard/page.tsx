import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const Dashboard = async ()=> {

    const session  = await getServerSession(); // Get the
    if(!session){
        redirect("/");
    }
    return (
     <div className="text-[25px] flex text-center  ">welcome to dashboard</div>
    );
 }
 
 export default  Dashboard; 