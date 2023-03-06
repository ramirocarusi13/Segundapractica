import { Router } from 'express'
import { ProductsModel } from '../persistencia/models/products.model.js'

const router = Router()

const products = [
    /*     {
            title: 'i3',
            description: '9100f 4 nucleos y 4 hilos',
            code:'i3',
            price: 70,
            status: true,
            stock: 1234556,
            image:'../public/img/i3f9th.jpg',
            category: 'procesadores',      
            brand: 'intel',
        },
        {
            title: 'i7',
            description: '10700f 8 nucleos y 12 hilos',
            code:'i7',
            price: 270,
            status: true,
            stock: 1234556,
            image:"https://static-geektopia.com/storage/t/i/745/74503/13d05679617276fe366276bdc.webp",
            category: 'procesadores',      
            brand: 'intel',
        },
        {
            title: 'i5',
            description: '11400f 4 nucleos y 4 hilos',
            code:'i5',
            price: 170,
            status: true,
            stock: 1234556,
            image:"",
            category: 'procesadores',      
            brand: 'intel',
        }, */
]
router.post('/create', async (req, res) => {
    try {
        const product = new ProductsModel(req.body);
        await product.save();
        res.json({ message: 'Product created', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/aggregation', async (req, res) => {
    const products = await ProductsModel.aggregate([
        { $match: { category: 'procesadores' } },
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
    const { limit = 10, page = 1, title } = req.query;
    const productsInfo = await ProductsModel.paginate({ title }, { limit, page });

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