const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 8877

//DB
mongoose.connect('mongodb://127.0.0.1:27017/charity', { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection

connection.once('open', () => {
    console.log(`MongoDB connectend...`)
})


app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})

