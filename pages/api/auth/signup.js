import { hashPassword } from "../../../helper/Auth";
import { emailFound, insertDocument } from "../../../helper/DatabaseUtil";


const Signup = async(req, res) => {

    if(req.method === "POST")
    {
        const {email, password} = req.body;
    
        if(!email || !email.includes("@") || !password || password.trim().length<7 )
        {
            return res.status(422).json({message: "Invalid input - Password should also be at least 7 characters long."});
        }

        const existingUser = await emailFound(email);

        if(existingUser)
        {
            return res.status(422).json({message:"User already exists!"});
        }
    
        const hashedPassword = await hashPassword(password);
    
        const result = await insertDocument("users", {email, password:hashedPassword});
        return res.status(201).json({message: "You are Successfully Registered!" , user: result});
    }

}

export default Signup;