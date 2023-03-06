import {ProductsModel} from '../models/products.model.js'

export default class ProductManager {

    async getProducts(limit, page, category, status, price) {
        try {
            if(!category && !status) {
                const products = await ProductsModel.paginate({},{limit, page, lean:true})
                return products
            } else if (category && !status){
                const products = await ProductsModel.paginate({category},{limit, page, sort:{price}, lean:true})
                return products
            } else if(status && !category) {
                const products = await ProductsModel.paginate({status},{limit, page, sort:{price}, lean:true})
                return products
            } else if(category && status) {
                const products = await ProductsModel.paginate({category, status},{limit, page, sort:{price}, lean:true})
                return products
            }
        } catch (error) {
            console.log(error);
        }
    }

    async addProducts(objProduct) {
        try {
            const newProduct = await ProductsModel.create(objProduct)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(pid) {
        try {
            const product = await ProductsModel.findById(pid)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, change) {
        try {
            const product = await ProductsModel.findByIdAndUpdate(pid, change, {new:true})
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid) {
        try {
            const product = await ProductsModel.findByIdAndDelete(pid)
            return product
        } catch (error) {
            console.log(error);
        }
    }
}