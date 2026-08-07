import LogOutButton from "./logOut"

import {auth} from "@/auth"
import {redirect} from "next/navigation"




export default async  function DashboardPage(){


    const session=await auth();
    

        if(!session){
            redirect("/api/auth/signin")
        }
    return(
        <div>
            <h1>{`Session is ${session.user?.name}`}</h1>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <LogOutButton/>

        </div>
    )
}

