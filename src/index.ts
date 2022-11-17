import express, {NextFunction, Request, Response } from "express"
import productsController from "./products/products.controller"
import usersController from './users/users.controller'
import ordersController from './orders/orders.controller'
const app = express()
import cors from 'cors'
import bodyPaser from 'body-parser'
import expressAsyncHandler from "express-async-handler"

const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyPaser.json())


app.get('/', expressAsyncHandler((req, res) => {
    res.status(200).send("WELCOME TO FLYHIGH SERVER")
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