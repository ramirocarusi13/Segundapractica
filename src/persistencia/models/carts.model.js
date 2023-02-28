import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            default: []
        }
    ]
})

cartsSchema.pre('find', function (next) {
    this.populate('products')
    next()
})

export const CartsModel = mongoose.model('Carts', cartsSchema)