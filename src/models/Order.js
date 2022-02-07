const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Order = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'E-mail é obrigatório'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
    },
    photo: {
        type: String,
        required: [true, 'Foto é obrigatório']
    },
    
    cpf: {
        type: String,
        required: [true, 'CPF é obrigatório']
    },
    
    birthday: {
        type: String,
        required: [true, 'Data de Nascimento é obrigatório']
    },
    
    costumerId: {
        type: String,
    },

    status: {
        type: String,
        enun: ['A', 'I', 'P'],
        default: 'P'
    },
    
    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', Order)
