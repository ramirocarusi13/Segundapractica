import { Router } from "express"
import ProductManager from "../persistencia/daos/ProductManager.js"
import CartManager from "../persistencia/daos/CartsManager.js"
import { auth, isLogged } from "../middlewares/auth.middleware.js"


const productManager = new ProductManager()
const cartManager = new CartManager()

const router = Router()

router.get('/registro', isLogged, (req, res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})

router.get('/login', isLogged, (req, res) => {
    res.render('login')
})
router.get('/admin', (req, res) => {
    res.render('admin', { email: req.session.email })
})
/* 
router.get('/perfil', auth, (req, res) => {
    res.render('products', { email: req.session.email })
}) */
router.get('/products', auth, async (req, res) => {
    const { limit = 11, page = 1, category, status, price } = req.query
    const products = await productManager.getProducts(limit, page, category, status, price)
    res.render('products', {
        email: req.session.email,
        products,
        style: 'style.css' 
    })
})


router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})
export default router