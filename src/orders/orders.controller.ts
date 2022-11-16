import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAuth } from '../utils/auths'
import OrderServices from './orders.service'
const router = express.Router()




router.post('/create-order', isAuth, expressAsyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, userId } = await req.body
    if (!orderItems || !shippingAddress || !userId) {
        res.status(404).json({ message: "Invalid Data" })
        return
    }
    const result = await OrderServices.createOrder({ ...req.body })
    res.status(201).json(result)
}))

router.get('/:_id', isAuth, expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
    const result = await OrderServices.getorderById(_id)
    res.status(200).json(result)
    
}))






export default router