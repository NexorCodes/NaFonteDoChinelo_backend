const Order = require('../models/Order')
const { total } = require('../util')
const { createPayment } = require('../services/gerencianet')

module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query

        try {
            const orders = await Order.paginate({}, { page, limit: 10 })
            return response.status(200).json(orders)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: 'Error loading orders' })            
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
    
            if(order && paymentMethod === 'pix') {
                const payment = await createPayment(clientName, clientCpf, totalValue)
                session.endSession()
                return response.json({ error: false, payment })
            }
    
            session.endSession()
            return response.json({ error: false, message: 'Pedido criado com sucesso' })
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }


    },

    async info(request, response) {
        const { id } = request.query

        try {
            const order = await Order.findById(id)
            return response.status(200).json(order)
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }

    },

    async delete(request, response) {
        const { id } = request.query
        
        try {
            const order = await Order.findByIdAndDelete(id)
            return response.status(200).json(order)
        } catch (error) {
            return response.status(400).json({ error: true, message: error.message })
        }

    }
        
}