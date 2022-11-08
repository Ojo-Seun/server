import db from "../db"
import ProductModel from "./products.schema"
import data from '../data'


class ProductServices  {

    constructor(){}

    createProduct = async () => {
        await db.connect()
        await ProductModel.deleteMany()
        const products = await ProductModel.insertMany(data)
        db.disconnect()
        return products
    }

     getAllProducts = async () => {
        await db.connect()
         const products = await ProductModel.find()
         db.disconnect()
        return products
    }


    getProductBySlug = async (slug:string) => {
        await db.connect()
        const product = await ProductModel.findOne({slug:slug})
        db.disconnect()
        if (product) {
            return product
        }
    }
}


export default ProductServices