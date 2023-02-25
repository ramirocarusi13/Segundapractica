import { Router } from 'express'
import CoursesManager from '../persistencia/daos/CoursesManager.js'

const coursesManager = new CoursesManager()

const router = Router()

const courses = [
    {
        nombre: 'JavaScript',
    },
    {
        nombre: 'BackEnd',
    },
    {
        nombre: 'FrontEnd',
    },
    {
        nombre: 'SQL',
    },
    {
        nombre: 'AWS',
    },

]
router.get('/create', async (req, res) => {
    const course = await coursesManager.createCourses(courses)
    res.json({ message: 'Courses created', course})
})

router.post('/addUsers', async (req, res) => {
    const { courseId, userId } = req.body
    const course = await coursesManager.addUserToCourse(courseId, userId)
    res.json({ message: 'User added', course })
})

router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params
    const course = await coursesManager.getCourse(courseId)
    res.json({ course })
})
export default router