const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Configuration = new Schema({
    name: {
        type: String,
    },

    description: {
        type: String,
    },

    slogan: {
        type: String,
    },

    keyswords: {
        type: String,
    },

    terms: {
        type: String,
    },

    privacy: {
        type: String,
    },

    refund: {
        type: String,
    },

    payment: {
        type: String,
    },

    embedCss: {
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

    facebook: {
        type: String,
    },

    instagram: {
        type: String,
    },
    
    youtube: {
        type: String,
    },
    
    whatsapp: {
        type: String,
    },
    
    register: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Configuration', Configuration)
