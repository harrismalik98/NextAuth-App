import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { emailFound } from "../../../helper/DatabaseUtil";
import { verifyPassword } from "../../../helper/Auth";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    jwt:{
        secret:process.env.NEXTAUTH_SECRET
    },
    providers:[
        Credentials({
            async authorize(credentials){
                const user = await emailFound(credentials.email);
                if(!user)
                {
                    throw new Error("No user found with this email.");
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if(!isValid)
                {
                    throw new Error("Password is not valid.");
                }

                return {email: user.email};
            }
        })
    ]
}

export default NextAuth(authOptions);