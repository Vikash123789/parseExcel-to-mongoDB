const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const route = require('./routes/routes')
const mongoose = require('mongoose')
const multer = require('multer')
app.use(bodyParser.json())
app.use(multer().any())


mongoose.connect("mongodb+srv://priyanka:PriyankaRajput@cluster0.fhqcn.mongodb.net/FastJobsAssignment-1?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("Welcome to FastJobs"))
    .catch(err => console.log(err))

app.use('/', route)


app.listen(3000, () => {
    console.log('Express app running on port 3000')
});
