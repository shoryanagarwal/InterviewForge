"use client"

import {signOut} from "next-auth/react"

export default function LogOutButton(){
    return(
        <button onClick={()=>signOut()} className="border text-white bg-blue-600 px-1 py-1 h-10 text-sm mt-2">Log Out</button>
    )
}