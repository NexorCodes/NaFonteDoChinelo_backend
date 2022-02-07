const sharp = require('sharp')
const fs = require('fs')

const User = require('../models/User')
const Product = require('../models/Product')


module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query
        const products = await Product.find()
        return response.json({ error: false, products })
    },

    async createProductThumb(request, response) {
        const { id } = request.query

        try {
            const existPath = fs.existsSync(`./public/products/${id}`)
    
            if(!existPath) {
                fs.mkdirSync(`./public/products/${id}`, { recursive: true })
    
                await sharp(request.file.path).toFormat('png').toFile(`./public/products/${id}/thumb.png`)
            }else{
                await sharp(request.file.path).toFormat('png').toFile(`./public/products/${id}/thumb.png`)
            }

            await Product.create({
                thumb: `/products/${id}/thumb.png`,
                productId: id
            })
    
            return response.json({ error: false, message: 'Imagem de principal adicionada com sucesso' })
            
        } catch (error) {
            return response.json({ error: true, message: 'Erro ao adicionar a imagem de principal' })
        }

    },

    async createProductImages(request, response) {
        const { id } = request.query
        
        try {
            request.files.forEach(async (file, i) => {
                setTimeout(async () => {
                    await sharp(file.path).toFormat('png').toFile(`./public/products/${id}/${i+1}.png`)
                }, i+300)
            })
            await Product.findOneAndUpdate({ productId: id }, { $set: { images: request.files.map((file, i) => `/products/${id}/${i+1}.png`) } })
            return response.json({ error: false, message: 'Imagens adicionadas com sucesso' })
        } catch (error) {
            console.log(error)
            return response.json({ error: true, message: 'Erro ao adicionar as imagens' })
        }
    },

    async createProductInfo (request, response) {
        const { id, name, normalPrice, promoPrice, description, category, colors, size } = request.body  

        try {
            const product = await Product.findOneAndUpdate({ productId: id }, { $set: { name, normalPrice, promoPrice, description, category, colors, size }})
            return response.json({ erro: false, product })
            
        } catch (error) {
            return response.json({ erro: true, message: error.message })
        }
    }
    
}