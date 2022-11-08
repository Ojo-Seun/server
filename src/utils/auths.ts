import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const generateToken = (user: { name: string; _id: any; email: string; isAdmin: boolean }) => {
    const { name, _id, email, isAdmin } = user

    return Jwt.sign({name,_id,email,isAdmin},process.env.JWT_SECRET!,{expiresIn:"2d"})
    
}



export {generateToken}