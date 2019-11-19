const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fundSchema = new Schema({
    name: String,
    image: String,
    description: String,
    moneyNeeded: Number,
    moneyCollected: Number
})

const Fund = mongoose.model("Fund", fundSchema)
module.exports = Fund