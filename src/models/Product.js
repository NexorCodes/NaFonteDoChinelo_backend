const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Product = new Schema({
    productId: {
        type: String,
    },

    name: {
        type: String,
    },

    normalPrice: {
        type: Number,
    },

    promoPrice: {
        type: Number,
    },

    description: {
        type: String,
    },

    category: {
        type: String,
    },

    thumb: {
        type: String,
    },

    images: {
        type: Array,
    },

    variations : {
        type: Array,
    },

    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', Product)
