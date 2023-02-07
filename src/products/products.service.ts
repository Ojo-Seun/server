import db from "../db"
import ProductModel from "./products.schema"
import data from '../data'


class ProductServices  {

    constructor(){}

    createProduct = async () => {
        await ProductModel.deleteMany()
        const products = await ProductModel.insertMany(data)
        return products
    }

     getAllProducts = async () => {
         const products = await ProductModel.find({category:"fixed-wing"})
        return products
    }


    getProductBySlug = async (slug:string) => {
        const product = await ProductModel.findOne({slug:slug})
        if (product) {
            return product
        }
    }
}


export default ProductServices