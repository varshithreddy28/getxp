const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    Email: String,
    contact: Number,
    collage: String,
    graduation: String,
    city: String
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student;