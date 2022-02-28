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
            slogan,
            description,
            keyswords,
            showBanner,
            showTwoImages,
            title,
            embedCss,
            headerEmbed,
            footerEmbed,
            openingHours,
            phone,
            terms,
            privacy,
            refund,
            payment,
            showWhatsappChat = false,
            whatsappChatUsers,
            email, 
            address,
            instagram,
            facebook,
            youtube,
            whatsapp,
            socialNetworks
         } = request.body

        const hasConfig = await Configuration.findOne()


        var logo = ''
        var favicon = ''

        if(request.files['logo']) {
            await sharp(request.files['logo'][0].path).toFormat('png').toFile(`./public/logo.png`)
            logo = `/logo.png`
            await Configuration.updateOne({ logo })
        }
        if(request.files['favicon']) {
            await sharp(request.files['favicon'][0].path).toFormat('png').toFile(`./public/favicon.png`)
            favicon = `/favicon.png`
            await Configuration.updateOne({ favicon })

        }
        

        if(hasConfig) {

            try {
                const config = await Configuration.updateOne({
                    name,
                    slogan,
                    description,
                    keyswords,
                    showBanner,
                    showTwoImages,
                    title,
                    embedCss,
                    headerEmbed,
                    footerEmbed,
                    openingHours,
                    phone,
                    terms,
                    privacy,
                    refund,
                    payment,
                    showWhatsappChat,
                    whatsappChatUsers: JSON.parse(whatsappChatUsers),
                    email,
                    address,
                    instagram,
                    facebook,
                    youtube,
                    whatsapp,
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
                    slogan,
                    description,
                    keyswords,
                    showBanner,
                    showTwoImages,
                    title,
                    embedCss,
                    headerEmbed,
                    footerEmbed,
                    openingHours,
                    phone,
                    terms,
                    privacy,
                    refund,
                    payment,
                    showWhatsappChat,
                    whatsappChatUsers: JSON.parse(whatsappChatUsers),
                    email,
                    address,
                    instagram,
                    facebook,
                    youtube,
                    whatsapp,
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