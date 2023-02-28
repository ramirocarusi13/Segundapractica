import { Router } from 'express'
import { ProductsModel } from '../persistencia/models/products.model.js'

const router = Router()

const products = [
    {
        nombre: 'i3',
        descripcion: '9100f 4 nucleos y 4 hilos',
        categoria: 'procesadores',
        stock: 1234556,
        precio: 70,
        marca: 'intel',
    },
    {
        nombre: 'i5',
        descripcion: ' 9400f, 6 nucleos y 6 hilos',
        categoria: 'procesadores',
        stock: 1236,
        precio: 200,
        marca: 'intel',
    },
    {
        nombre: 'i5',
        descripcion: '10400f, 6 nucleos y 6 hilos',
        categoria: 'procesadores',
        stock: 1888,
        precio: 300,
        marca: 'intel',
    },
]
router.get('/create', async (req, res) => {
    await ProductsModel.create(products)
    res.json({ message: 'Product created' })
})

router.get('/aggregation', async (req, res) => {
    const products = await ProductsModel.aggregate([
        { $match: { categoria: 'procesadores' } },
        {
            $group: {
                _id: '$marca',
                promedio: { $avg: '$precio' },
                cantidad: { $sum: '$stock' },
            },
        },
        {
            $sort: { cantidad: 1 },
        },
    ])
    res.json({ products })
})


router.get('/pagination', async (req, res) => {
    const { limit = 10, page = 1, nombre } = req.query;
    const productsInfo = await ProductsModel.paginate({ nombre }, { limit, page });

    // Crear los enlaces prevLink y nextLink
    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0];
    const prevLink = productsInfo.hasPrevPage ? `${baseUrl}?page=${productsInfo.prevPage}&limit=${limit}` : null;
    const nextLink = productsInfo.hasNextPage ? `${baseUrl}?page=${productsInfo.nextPage}&limit=${limit}` : null;

    res.json({
        status: 'Exitoso',
        payload: productsInfo.docs,
        totalPages: productsInfo.totalPages,
        prevPage: productsInfo.prevPage,
        nextPage: productsInfo.nextPage,
        prevLink,
        nextLink
    });
});


//METODO DELETE 

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    const deletedProduct = await ProductsModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
        return res.json({ message: 'Product not found' });
    }
    return res.json({ message: 'Product deleted', deletedProduct });
});




export default router