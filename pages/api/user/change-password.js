import { emailFound, passwordChange } from "../../../helper/DatabaseUtil";
import { hashPassword, verifyPassword } from "../../../helper/Auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const ChangePassword = async(req,res) => {
    if(req.method !== "PATCH")
    {
        return res.status(405).end();;
    }

    const session = await getServerSession(req, res , authOptions);
    if(!session)
    {
        return res.status(401).json({message:"Not Authenticated!"});
    }

    const email = session.user.email;
    const {newPassword, oldPassword} = req.body;

    if(newPassword === oldPassword)
    {
        return res.status(400).json({message: "The new password cannot be the same as the old password."});
    }

    const user = await emailFound(email);
    if(!user)
    {
        return res.status(404).json({message:"User not found."});
    }

    const verifyOldPassword = await verifyPassword(oldPassword, user.password);
    if(!verifyOldPassword)
    {
        return res.status(403).json({message:"Please enter correct old password"});
    }

    const hashedPassword = await hashPassword(newPassword)
    const changePassword = await passwordChange(email, hashedPassword);
    return res.status(200).json({message:"Password updated."});
}

export default ChangePassword;