import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import './persistencia/dbConfig.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})