import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

import {PrismaAdapter} from "@auth/prisma-adapter"

import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";

export const {handlers,signIn,signOut,auth}=NextAuth({
    adapter: PrismaAdapter(prisma),

    session:{
        strategy:"jwt"
    },

  pages: {
    signIn: "/login",
  },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        }),

        CredentialsProvider({
            name:"Credentials",

            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                    placeholder:"Enter your email"
                },
                password:{
                    label:"Password",
                    type:"password",
                    placeholder:"Enter your password"
                }
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    return null;
                }


                const email=String(credentials.email).trim().toLowerCase();

                const password=String(credentials.password)

                const user=await prisma.user.findUnique({
                    where:{
                        email:email
                    }
                })

                if(!user || !user.password){
                    return null;
                }


                const isPasswordValid=await bcrypt.compare(password,user.password);

                if(!isPasswordValid){
                    return null;
                }

                return {
                    id:user.id,
                    name:user.name,
                    email:user.email
                }

            }



        })
    ],


    callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
})


