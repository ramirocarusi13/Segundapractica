import mongoose from 'mongoose'

const coursesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            default: []
        }
    ]
})

coursesSchema.pre('find', function (next) {
    this.populate('users')
    next()
})

export const CoursesModel = mongoose.model('Courses', coursesSchema)