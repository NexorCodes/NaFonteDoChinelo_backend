const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Configuration = new Schema({
    name: {
        type: String,
    },

    description: {
        type: String,
    },

    keyswords: {
        type: String,
    },

    title: {
        type: String,
    },

    headerEmbed: {
        type: String,
    },

    footerEmbed: {
        type: String,
    },

    logo: {
        type: String,
    },

    favicon: {
        type: String,
    },

    openingHours: {
        type: String,
    },

    phone: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    showWhatsappChat: {
        type: Boolean,
        enum: [true, false],
    },

    email: {
        type: String,
    },

    address: {
        type: String,
    },

    socialNetworks: {
        type: Array,
    },

    
    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Configuration', Configuration)
