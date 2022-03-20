const Client = require('../models/Client')

module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query

        try {
            const clients = await Client.paginate({}, { page, limit: 10, sort: { lastPurchaseDate: 'desc' } })
            return response.status(200).json(clients)
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: true,  message: 'Erro ao listar clientes' })
        }
    },

    async delete(request, response) {
        const { id } = request.query

        try {
            const client = await Client.findByIdAndDelete({ _id : id })
            return response.status(200).json({ error: false })
        } catch (error) {
            console.log(error)
            return response.status(400).json({ error: true, message: 'Erro ao deletar o cliente' })
        }
    }
}