const { default: mongoose } = require("mongoose");


const literatureSchema  = new mongoose.Schema({
    passage:String,
    author:String,
    format:String,
    title:String,
    year:Number
})

const Litreature = mongoose.model("Litreature",literatureSchema)

module.exports = Litreature