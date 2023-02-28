import { CartsModel } from '../models/carts.model.js'

export default class CartsManager {
    async createCarts(array) {
        try {
            const carts = await CartsModel.create(array)
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getCart(id) {
        try {
            const cart = await CartsModel.find({ _id: id })
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await CartsModel.findById(cartId)
            cart.products.push(productId)
            cart.save()
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartsModel.findById(cartId);
            const index = cart.products.indexOf(productId);
            if (index > -1) {
                cart.products.splice(index, 1);
                cart.save();
                return cart;
            } else {
                return { message: 'Product not found in cart' };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            const deletedCart = await CartsModel.findByIdAndDelete(id);
            if (!deletedCart) {
                return { message: 'Cart not found' };
            }
            return { message: 'Cart deleted', deletedCart };
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAllProductsFromCart(cartId) {
        try {
            const cart = await CartsModel.findById(cartId);
            if (!cart) {
                return { message: 'Cart not found' };
            }
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateCart(cid, products) {
        try {
            const updatedCart = await CartsModel.findByIdAndUpdate(cid, { products }, { new: true })
            return updatedCart
        } catch (error) {
            console.log(error)
        }
    }
    async updateProductStock(cartId, productId, quantity) {
        try {
            const cart = await CartsModel.findById(cartId);
            const productIndex = cart.products.findIndex((product) => product._id == productId);
            if (productIndex === -1) {
                return { message: 'Product not found in cart' };
            }
            cart.products[productIndex].stock = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }



}