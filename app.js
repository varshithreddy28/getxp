
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbUrl = "mongodb+srv://varshith:varshith123@cluster0.9hmrp.mongodb.net/getxp?retryWrites=true;"

app.use(express.urlencoded({ extended: true }))

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() =>
        console.log('Connected to DB!')
    )
    .catch((error) =>
        console.log(error.message)
    );

const Student = require('./model/collage')
const Name = require('./model/names')


app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const foundStudents = await Student.find()
    let final = []
    let collages = []
    let totalStud = []
    let collageStud = []
    for (const student of foundStudents) {
        collages.push(student.collage)
    }
    collages = [...new Set(collages)]
    for (const name of collages) {
        let total = 0
        for (const student of foundStudents) {
            if (name === student.collage) {
                total++
            }
        }
        totalStud.push(total)
    }
    for (const name of collages) {
        let xyz = []
        for (const student of foundStudents) {
            if (name === student.collage) {
                xyz.push({ student })
            }
        }
        collageStud.push(xyz)
    }

    console.log(collages, totalStud, collageStud)

    for (let i = 0; i < collages.length; i++) {
        final[i] = {
            collage: collages[i],
            total: totalStud[i],
            students: collageStud[i]
        }
    }
    res.render('home', { students: final })
})

app.get('/student/new', async (req, res) => {
    const collageNmaes = await Name.find()
    res.render("new", { names: collageNmaes })
})

app.post('/student/new', async (req, res) => {
    const data = req.body.student
    const newStudent = new Student({ ...data })
    // console.log(newStudent)
    await newStudent.save()
    res.redirect('/')
})

app.get('/add/collage', (req, res) => {
    res.render('add')
})

app.post('/add/collage', async (req, res) => {
    const name = req.body
    const foundNames = await Name.find()
    foundNames.forEach((a) => {
        if (a === name) {
            return console.log("Already Exists")
        }
    });
    const newName = new Name(name)
    await newName.save()
    res.redirect('/')
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log("Connected to 3000")
})