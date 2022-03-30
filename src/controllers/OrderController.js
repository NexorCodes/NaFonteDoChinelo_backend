const Order = require('../models/Order')
const Client = require('../models/Client')
const Product = require('../models/Product')

const { total } = require('../util')
const { createPayment, getPayment } = require('../services/gerencianet')

module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query

        try {
            const orders = await Order.paginate({}, { page, limit: 10, sort: {register: 'desc'} })
            return response.status(200).json({ error: false, orders })
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: true, message:'Erro ao carregar a lista de pedidos' })            
        }
    },

    async create(request, response) {
        const {
            clientName,
            clientPhone,
            clientCpf,
            shippingMethod,
            shippingAddress,
            shippingPrice,
            shippingType,
            paymentMethod,
            products,
            status = 'Pending',
        } = request.body

        try {
            const session = await Order.startSession()
            
            var totalValue = total(products)
            var shippingPriceCalc = null
            if(shippingMethod === 'correio' || shippingMethod === 'excursao') {
                totalValue = Number(totalValue) + Number(shippingPrice.value.replace(',', '.'))
                totalValue = parseFloat(totalValue).toFixed(2)
                shippingPriceCalc = shippingPrice.value.replace(',', '.')
            }

            const client = await Client.findOne({ cpf: clientCpf })
            
            if(client) {
                await Client.updateOne({
                    name: clientName,
                    phone: clientPhone,
                    cpf: clientCpf,
                    totalSpent: parseFloat(client.totalSpent+Number(totalValue)).toFixed(2),
                    lastPurchaseDate: new Date(),
                })
            }else{
                await Client.create({
                    name: clientName,
                    phone: clientPhone,
                    cpf: clientCpf,
                    totalSpent: totalValue,
                    lastPurchaseDate: new Date(),
                })
            }

            const new_client = await Client.findOne({ cpf: clientCpf })
    
            if(paymentMethod === 'pix') {
                const payment = await createPayment(clientName, clientCpf, totalValue)
                session.endSession()
                const order = await Order.create({
                    clientName,
                    clientPhone,
                    clientCpf,
                    shippingMethod,
                    shippingAddress,
                    shippingPrice: shippingPriceCalc,
                    shippingType,
                    paymentMethod,
                    products,
                    total: totalValue,
                    status,
                    txId: payment.payment.txid,
                    qrCode: payment.qrcode.qrcode,
                    qrCodeImage: payment.qrcode.imagemQrcode,
                })
                return response.json({ error: false, payment: payment.payment, qrcode: payment.qrcode, order })
            }

            const order = await Order.create({
                clientName,
                clientPhone,
                clientCpf,
                shippingMethod,
                shippingAddress,
                shippingPrice: shippingPriceCalc,
                shippingType,
                paymentMethod,
                products,
                total: totalValue,
                status,
            })


            products.forEach(async product => {
                product.product.variations.forEach(async variation => {
                    console.log(variation.quantity)
                    await Product.updateOne({
                        _id: product._id,
                    }, {
                        $inc: {
                            'variations.$.quantity': -variation.quantity
                        }
                    })
                })
            })



            session.endSession()
            return response.json({ error: false, client: new_client, order })
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }


    },

    async info(request, response) {
        const { id } = request.query

        try {
            const order = await Order.findById(id)
            return response.status(200).json({ error: false, order })
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }

    },

    async update(request, response) {
        const { id, status } = request.body
        try {
            const order = await Order.findOneAndUpdate({ _id: id }, { status }, { new: true })
            return response.status(200).json({ error: false })
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }
    },

    async delete(request, response) {
        const { id } = request.query
        
        try {
            const order = await Order.findByIdAndDelete(id)
            return response.status(200).json({ error: false, order })
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }

    },

    async orderDetails(request, response) {
        const { id } = request.query

        try {
            const order = await Order.findOne({ "_id": id })

            return response.status(200).json({error: false, order })
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }
    }
        
}