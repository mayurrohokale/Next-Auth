import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import connect from  "@/app/utils/db";


export const authOptions:any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        id: "Credentials",
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "text"},
            password: { label : "Password" ,type: "password"},
        },
        async authorize(credentials:any){
            await connect();
            try {
                const user = await User.findOne({email:  credentials.email});
                if(user){
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password,
                    )
                    if(isPasswordCorrect){
                        return user;
                    }
                    }
            }catch(err:any){
                throw new Error(err);
            }
        }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};