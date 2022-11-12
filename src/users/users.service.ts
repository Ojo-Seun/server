import db from "../db";
import { registerProps } from "../utils/typescriptTypes";
import UserModel from "./users.schema";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/auths";


class UserServices  {

    
    static register = async (userInfo: registerProps) => {
       await db.connect()
        const isExist = await UserModel.findOne({ email: userInfo.email })
        if (isExist) {
            return "Email Already Exist" 
        }
         
        const User = await new UserModel({ ...userInfo,password:bcrypt.hashSync(userInfo.password,10) })
        const result = await User.save()

        const { name, _id, isAdmin } = await result
        db.disconnect()

        return {
            name,
            _id,
            isAdmin,
            Token:generateToken(result)
        }
    }



    static login = async (userInfo: { email: string, password: string }) => {
        await db.connect()
        const user = await UserModel.findOne({ email: userInfo.email })
        db.disconnect()
        if (user?.name) {
            const result = await bcrypt.compare(userInfo.password, user.password)
            if (result) {
                const { name, _id, isAdmin } = user
                return {
                    name,
                    _id,
                    isAdmin,
                    Token:generateToken(user)
                }
            }

            return  "Invalid Password"
        }

        return "Invalid Email"
        
    }


    static getAllUsers = async () => {
        await db.connect()
        const users = await UserModel.find({})
         db.disconnect()

        if (users) {
            return users
        }
        return {}
       
    }
    
}


export default UserServices