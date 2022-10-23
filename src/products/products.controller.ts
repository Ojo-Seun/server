import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import db from '../db'
import ProductServices from './products.service'
import getAllProducts from './products.service'
const router = express.Router()


const productServices = new ProductServices()


router.post('/create-product', expressAsyncHandler( async(req:Request, res:Response) => {
    const products = await productServices.createProduct()
    res.status(201).json(products)

}))

router.get('/', expressAsyncHandler( async(req:Request, res:Response)=> {
    const products = await productServices.getAllProducts()
    res.status(200).json(products)
}))

router.get('/:slug', expressAsyncHandler(async (req:Request, res:Response) => {
    
    const slug = req.params.slug
    await productServices.getProductBySlug(slug)
        .then(product => {
        res.status(200).json(product)
        }).catch(err => {
            res.status(500).json({
            Error:err.message
        })
    })
    
}))

export default router