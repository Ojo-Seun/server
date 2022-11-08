import express, {NextFunction, Request, Response } from "express"
import productsController from "./products/products.controller"
import usersController from './users/users.controller'
const app = express()
import cors from 'cors'
import bodyPaser from 'body-parser'

const port = process.env.PORT || 5000

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }))
app.use(bodyPaser.json())




app.use('/api/products', productsController)
app.use('/api/users', usersController)








app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    const status = err.name && err.name === 'validationError'? 400:500;
    res.status(status).send({message:err.message})
})



app.listen(port, () => {
    console.log(`App Running at ${port}`)
})