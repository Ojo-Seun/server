import express, {NextFunction, Request, Response } from "express"
import productsPontroller from "./products/products.controller"
import mongoose from "mongoose"
const app = express()
import  cors from 'cors'
app.use(cors({origin:"http://localhost:3000",optionsSuccessStatus:200}))
const port = process.env.PORT || 5000

// mongoose.connect('mongodb://localhost:27017/amazon', {
    
// }).catch(error=> console.log(`${error.reason  }error from database`));


app.use('/api/products', productsPontroller)








app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    const status = err.name && err.name === 'validationError'? 400:500;
    res.status(status).send({message:err.message})
})



app.listen(port, () => {
    console.log(`App Running at ${port}`)
})