import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import validateData from '../utils/validateData'
import UserServices from './users.service'
const router = express.Router()


router.post('/register', expressAsyncHandler(async(req, res) => {
    const userInfo = req.body
    const { name, email, password } = userInfo
    
    if(!name || !email || !password) return
    for (const data in userInfo) {
        const valid = validateData(data, userInfo[data])
        if (!valid) {
            res.status(401).json({ message: "incorrect Data Format" })
            return
        }
    }
    
    const result = await UserServices.register({ ...userInfo, isAdmin: false })

    if (typeof result === "object") {
       res.status(201).json({ ...result, message:"You Have Succefully Registered"})
    } else {
        res.status(200).json({message:result})
    }
}))


router.post('/login', expressAsyncHandler(async(req, res) => {
    const userInfo = req.body
    const { email, password } = userInfo
    
    if(!email || !password) return
    for (const data in userInfo) {
        const valid = validateData(data, userInfo[data])
        if (!valid) {
            res.status(401).json({ message: "incorrect Data Format" })
            return
        }
    }
    
    const result = await UserServices.login(userInfo)

    if (typeof result === "object") {
       res.status(201).json({ ...result, message:"You Have Succefully Login"})
    } else {
        res.status(200).json({message:result})
    }
}))





router.get('/get-all-users', expressAsyncHandler(async (req, res) => {
    
    const result = await UserServices.getAllUsers()
    res.status(200).json(result)

}))

export default router