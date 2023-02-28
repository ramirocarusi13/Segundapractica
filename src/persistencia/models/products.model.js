import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        //unique: true,
    },
    stock: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
})

productsSchema.plugin(mongoosePaginate)

export const ProductsModel = mongoose.model('Products', productsSchema)