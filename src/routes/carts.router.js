import { Router } from 'express'
import CartsManager from '../persistencia/daos/CartsManager.js'

const cartsManager = new CartsManager()

const router = Router()

const carts = [
    {
        nombre: 'carrito1',
    },
    {
        nombre: 'carrito2',
    },

]
router.get('/create', async (req, res) => {
    const cart = await cartsManager.createCarts(carts)
    res.json({ message: 'Carts created', cart })
})

router.post('/addProduct', async (req, res) => {
    const { cartId, productId } = req.body
    const cart = await cartsManager.addProductToCart(cartId, productId)
    res.json({ message: 'Product added', cart })
})

router.get('/:cartId', async (req, res) => {
    const { cartId } = req.params
    const cart = await cartsManager.getCart(cartId)
    res.json({ cart })
})

//METODO DELETE CART

router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params
    const deletedCart = await cartsManager.deleteCart(cartId)
    if (deletedCart) {
        res.json({ message: 'Cart deleted', cart: deletedCart })
    } else {
        res.json({ message: 'Cart not found' })
    }
})

//METODO DELETE PRODUCTO DE CART

router.delete('/:cartId/removeProduct/:productId', async (req, res) => {
    const { cartId, productId } = req.params;
    const result = await cartsManager.removeProductFromCart(cartId, productId);
    if (result.message) {
        res.json({ message: result.message });
    } else {
        res.json({ message: 'Product removed from cart', cart: result });
    }
});

//METODO DELETE TODOS LOS PRODUCTOS DE CART

router.delete('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    const result = await cartsManager.deleteAllProductsFromCart(cartId);
    if (result.message) {
        res.json({ message: result.message });
    } else {
        res.json({ message: 'All products removed from cart', cart: result });
    }
});

// METODO PUT
router.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const { products } = req.body
    const updatedCart = await cartsManager.updateCart(cid, products)
    res.json({ message: 'Cart updated', cart: updatedCart })
})

router.put('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params;
    const { cantidad } = req.body;
    const result = await cartsManager.updateProductStock(cartId, productId, cantidad);
    if (result.message) {
        res.json({ message: result.message });
    } else {
        res.json({ message: 'Product quantity updated', cart: result });
    }
});




export default router