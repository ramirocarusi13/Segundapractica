import mongoose from 'mongoose'

mongoose.connect(
    'mongodb+srv://ramiro:coderhouse@clusterrc.wwlwaqy.mongodb.net/DataC?retryWrites=true&w=majority',
    (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Conectado a la base de datos')
        }
    }
)
