require('dotenv').config()
var axios = require("axios")
const { v4: uuidv4 } = require('uuid')
const moment = require('moment-timezone')
moment.locale('pt-br')

const config = require('../services/gerencianet')


module.exports = {
    async createPayment (request, response)  {
        const { clientName, clientCpf, paymentValue } = request.body

        const get_token = await axios(config).then(r => r.data)
        const token = `Bearer ${get_token.access_token}`

        var data = {
            "calendario": {
              "expiracao": 3600
            },
            "devedor": {
              "cpf": clientCpf,
              "nome": clientName
            },
            "valor": {
              "original": paymentValue
            },
            "chave": process.env.GERENCIANET_KEY,
            "solicitacaoPagador": "Teste Compra"
        }

        var txId = uuidv4().split('-').join('')

        var requestConfig = {
            method: "PUT",
            url: `${process.env.GERENCIANET_BASE_URL}/v2/cob/${txId}`,
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            },
            httpsAgent: config.httpsAgent,
            data: data
        }
        
        const payment = await axios(requestConfig).then(r => r.data)

        const locId = payment.loc.id

        const genQrCode = {
            method: "GET",
            url: `${process.env.GERENCIANET_BASE_URL}/v2/loc/${locId}/qrcode`,
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            },
            httpsAgent: config.httpsAgent,
          }

        const qrcode = await axios(genQrCode).then(qrcode => qrcode.data)


        return response.status(200).json(qrcode)
    },

    async listPayments(request, response) {

        const get_token = await axios(config).then(r => r.data)
        const token = `Bearer ${get_token.access_token}`
        
        const data = {
            method: "GET",
            url: `${process.env.GERENCIANET_BASE_URL}/v2/cob?inicio=${moment().utc(-3).subtract(1, 'days').format()}&fim=${moment().utc(-3).add(1, 'days').format()}`,
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            },
            httpsAgent: config.httpsAgent,
          }

        const payments = await axios(data).then(payments => payments.data)

        return response.status(200).json(payments)
    }
}