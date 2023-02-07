import express, {NextFunction, Request, Response } from "express"
import productsController from "./products/products.controller"
import usersController from './users/users.controller'
import ordersController from './orders/orders.controller'
const app = express()
import cors from 'cors'
import bodyPaser from 'body-parser'
import expressAsyncHandler from "express-async-handler"
import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()


const port = process.env.PORT || 5000
export const dbUrl = process.env.NODE_ENV==="production"? process.env.ATLAS_URL:process.env.LOCAL_MONGODB_URL

mongoose.connect(dbUrl!).then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });



app.use(cors())
app.use(bodyPaser.json())

app.get('/', expressAsyncHandler((req, res) => {
    res.status(200).send("WELCOME TO FLYHIGH")
}))

app.use('/api/products', productsController)
app.use('/api/users', usersController)
app.use('/api/orders', ordersController)








app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    const status = err.name && err.name === 'validationError'? 400:500;
    res.status(status).send({message:err.message})
})



app.listen(port, () => {
    console.log(`App Running at ${port}`)
})