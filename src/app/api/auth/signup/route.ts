import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    try{
    const body=await req.json();

    const {name,email,password}=body;


    if(!name || !email || !password){
        return NextResponse.json({message:"Missing required fields"}, {status:400})
    }

    if(password.length<6){
        return NextResponse.json({message:"Password must be at least 6 characters long"}, {status:400})
    }

    const existingUser=await prisma.user.findUnique({
        where:{
            email:email
        }
    }) 

    if(existingUser){
        return NextResponse.json({message:"User already exists"}, {status:400})
    }

    const hashedPassword=await bcrypt.hash(password,10);
    // creatin user
    const user=await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        }
    })

    return NextResponse.json({message:"User created successfully",user:user},{status:201})
}
catch(error){
    console.error("Error creating user:", error);
    return NextResponse.json({message:"Internal server error"},{status:500})
}




}