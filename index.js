const express = require('express') //express is a function
const Joi = require('joi')

const app = express()

app.use(express.json()) //Be able to get the body for the post request

//enviroment variable "PORT"
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})

app.get('/', (req, res) => {
    res.send('Helloooo From Sean')
})

app.get('/api/courses', (req, res) =>{
    res.json(courses)
})

const courses = [
    {id: 1, name: "Node.JS Tutorial"},
    {id: 2, name: "Swift Tutorial"},
    {id: 3, name: "JavaScript Tutorial"}
]

app.get('/api/course/:id', (req, res) => {
    const course = findCoursebyId(req.params.id)
    if (!course) {
        res.status(404).send('Failed to find the course with the given ID')
        return
    }
    res.send(course)
})

app.post('/api/create_course', (req, res) => {

    const result = validateNameInRequestBody(req.body)
    console.log(result)
    const { error } = validateNameInRequestBody(req.body)  //error = result.error

    if (error) return res.status(404).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/update_course/:id', (req,res) => {
    const course = findCoursebyId(req.params.id)
    if (!course) return res.status(404).send('Failed to update the course with the given ID')

    const result = validateNameInRequestBody(req.body)
    if (result.error) return res.status(404).send(result.error.details[0].message)

    course.name = req.body.name
    res.send(course)
})

app.delete('/api/delete_course/:id', (req, res) => {
    const course = findCoursebyId(req.params.id)
    if (!course) return res.status(404).send('Failed to Delete the course with the given ID')

    const index = courses.indexOf(course)
    //Delete
    courses.splice(index, 1)
    res.send(course)

})

 function validateNameInRequestBody(requestBody){
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(requestBody, schema)
    return result
}

function findCoursebyId(id){
    const course = courses.find(course => course.id === parseInt(id))
    return course
}