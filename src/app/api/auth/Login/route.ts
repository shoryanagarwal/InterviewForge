import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req:Request){

    try{
       
        const body=await req.json();

        const {email,password}=body;

        if(!email || !password){
            return NextResponse.json({message:"Missing required fields"},{status:400})
        }

        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })


        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }

        // if user milta hai to password compare karenge
        if(!user.password){
            return NextResponse.json({message:"User does not have a password set"},{status:400})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return NextResponse.json({message:"Invalid password"},{status:401})
        }


        


    
    return NextResponse.json(
      {
        message: "Login credentials verified successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
        {
            status: 200,
        }
    );
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }




}