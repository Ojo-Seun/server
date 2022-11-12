import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { Request,Response,NextFunction } from "express";
dotenv.config()
const generateToken = (user: { name: string; _id: any; email: string; isAdmin: boolean }) => {
    const { name, _id, email, isAdmin } = user

    return Jwt.sign({name,_id,email,isAdmin},process.env.JWT_SECRET!,{expiresIn:"2d"})
    
}


 const isAuth = (req:Request,res:Response,next:NextFunction)=>{
     const { authorization } = req.headers;
     const Token = authorization? authorization.split(' ')[1] : '' 
        if(Token){
            Jwt.verify(Token,process.env.JWT_SECRET!,(err:any,decode:any)=>{
                if(err){
                    res.status(401).send({message:'Invalid Token'})
                }else{
                    req.body.userId = decode._id;
                    next()
                }
            });
        }else{
            res.status(401).send({
                message:"Please Register or Login"
            })
        }
}
    

const adminAuth = (req: Request, res: Response, next: NextFunction)=>{
    if (req.body.user.isAdmin) {
        next()
    } else {
        res.status(404).json({message:"Unathorize"})
    }
}


export {generateToken,isAuth,adminAuth}