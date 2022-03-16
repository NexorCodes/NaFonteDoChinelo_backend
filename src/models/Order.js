const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Order = new Schema({
    clientName: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    clientPhone: {
        type: String,
        required: [true, 'Telefone é obrigatório']
    },    
    clientCpf: {
        type: String,
        required: [true, 'CPF é obrigatório']
    },
    shippingMethod: {
        type: String,
    },
    shippingAddress: {
        type: Object,
    },
    shippingPrice: {
        type: Number,
    },
    shippingType: {
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    products: {
        type: Array,
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
        enun: ['Pending', 'Paid', 'Canceled'],
        default: 'Pending'
    },
    
    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', Order)
