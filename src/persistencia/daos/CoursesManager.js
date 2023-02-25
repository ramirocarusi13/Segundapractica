import { CoursesModel } from '../models/courses.model.js'

export default class CoursesManager {
    async createCourses(array) {
        try {
            const courses = await CoursesModel.create(array)
            return courses
        } catch (error) {
            console.log(error)
        }
    }

    async getCourse(id) {
        try {
            const course = await CoursesModel.find({ _id: id })
            return course
        } catch (error) {
            console.log(error)
        }
    }

    async addUserToCourse(courseId, userId) {
        try {
            const course = await CoursesModel.findById(courseId)
            course.users.push(userId)
            course.save()
            return course
        } catch (error) {
            console.log(error)
        }
    }
}