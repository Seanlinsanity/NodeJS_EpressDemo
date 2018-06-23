const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.get('/', (req, res) =>{
    res.json(courses)
})

const courses = [
    {id: 1, name: "Node.JS Tutorial"},
    {id: 2, name: "Swift Tutorial"},
    {id: 3, name: "Java Tutorial"}
]

router.get('/course/:id', (req, res) => {
    const course = findCoursebyId(req.params.id)
    if (!course) {
        res.status(404).send('Failed to find the course with the given ID')
        return
    }
    res.send(course)
})

router.post('/create_course', (req, res) => {

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

router.put('/update_course/:id', (req,res) => {
    const course = findCoursebyId(req.params.id)
    if (!course) return res.status(404).send('Failed to update the course with the given ID')

    const result = validateNameInRequestBody(req.body)
    if (result.error) return res.status(404).send(result.error.details[0].message)

    course.name = req.body.name
    res.send(course)
})

router.delete('/delete_course/:id', (req, res) => {
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

module.exports = router