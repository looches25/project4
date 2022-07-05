const mongoose = require('mongoose')

const SKUSchema = mongoose.Schema ({
    SKUname: {type: String, required: true},
    Unit: {type: String},
    SKUQty: {type: Number, required: true},
    Price: {type: Number, required: true},
})

module.exports = mongoose.model("SKU", SKUSchema)