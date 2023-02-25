import { Router } from 'express'
import { UsersModel } from '../persistencia/models/users.model.js'

const router = Router()

const users = [
    {
        nombre: 'Juan',
        apellido: 'Hoyos',
        email: 'jhoyos@mail.com',
        dni: 1234556,
        genero: 'M',
        calificacion: 10,
        grupo: '1A',
    },
    {
        nombre: 'Carlos',
        apellido: 'Zuluaga',
        email: 'czuluaga@mail.com',
        dni: 455676,
        genero: 'M',
        calificacion: 8,
        grupo: '1B',
    },
    {
        nombre: 'Franco',
        apellido: 'Abello',
        email: 'fabello@mail.com',
        dni: 5466778,
        genero: 'M',
        calificacion: 5,
        grupo: '1A',
    },
    {
        nombre: 'Luis',
        apellido: 'Osorio',
        email: 'losorio@mail.com',
        dni: 43678787,
        genero: 'M',
        calificacion: 10,
        grupo: '1B',
    },
    {
        nombre: 'Farid',
        apellido: 'Gutierrez',
        email: 'fgutierrez@mail.com',
        dni: 56787889,
        genero: 'M',
        calificacion: 4,
        grupo: '1A',
    },
    {
        nombre: 'Carolina',
        apellido: 'Villadiego',
        email: 'cvilladiego@mail.com',
        dni: 4354567,
        genero: 'F',
        calificacion: 10,
        grupo: '1A',
    },
    {
        nombre: 'Melissa',
        apellido: 'Archbold',
        email: 'marchbold@mail.com',
        dni: 4567676,
        genero: 'F',
        calificacion: 8,
        grupo: '1B',
    },
]
router.get('/create', async (req, res) => {
    await UsersModel.create(users)
    res.json({ message: 'Users created' })
})

router.get('/aggregation', async (req, res) => {
    const users = await UsersModel.aggregate([
        { $match: { genero: 'M' } },
        {
            $group: {
                _id: '$grupo',
                promedio: { $avg: '$calificacion' },
                cantidad: { $sum: '$calificacion' },
            },
        },
        {
            $sort: { cantidad: 1 },
        },
    ])
    res.json({ users })
})

router.get('/pagination', async (req, res) => {
    const { limit = 10, page = 1, nombre } = req.query
    const usersInfo = await UsersModel.paginate({ nombre }, { limit, page })
    //res.json({status:'Exitoso',payload:usersInfo.docs,totalPages:usersInfo.totalPages,prevPage:usersInfo.prevPage})
    res.json({ usersInfo })
})

export default router