const sharp = require('sharp')
const Configuration = require('../models/Configuration')


module.exports = {
    async list(request, response) {
        const configs = await Configuration.find()
        return response.json({ error: false, configs })
    },

    async edit(request, response) {
        const { 
            name,
            description,
            keyswords,
            title,
            headerEmbed,
            footerEmbed,
            openingHours,
            phone,
            whatsapp,
            showWhatsappChat = false,
            email, 
            address, 
            socialNetworks
         } = request.body

        const hasConfig = await Configuration.findOne()


        var logo = ''
        var favicon = ''

        if(request.files['logo']) {
            await sharp(request.files['logo'][0].path).toFormat('png').toFile(`./public/logo.png`)
            logo = `/logo.png`
        }
        if(request.files['favicon']) {
            await sharp(request.files['favicon'][0].path).toFormat('png').toFile(`./public/favicon.png`)
            favicon = `/favicon.png`
        }
        

        if(hasConfig) {

            try {
                const config = await Configuration.updateOne({
                    name,
                    description,
                    keyswords,
                    title,
                    headerEmbed,
                    footerEmbed,
                    logo,
                    favicon,
                    openingHours,
                    phone,
                    whatsapp,
                    showWhatsappChat,
                    email,
                    address,
                    socialNetworks
                })

                return response.json({ error: false, config })
            } catch (error) {
                console.log(error)
                return response.json({ error: true, message: 'Erro ao criar a configuração' })
            }
        }else{
            try {
                const config = await Configuration.create({
                    name,
                    description,
                    keyswords,
                    title,
                    headerEmbed,
                    footerEmbed,
                    logo,
                    favicon,
                    openingHours,
                    phone,
                    whatsapp,
                    showWhatsappChat,
                    email,
                    address,
                    socialNetworks
                })

                return response.json({ error: false, config })
            } catch (error) {
                console.log(error)
                return response.json({ error: true, message: 'Erro ao criar a configuração' })
            }
        }
    },


}