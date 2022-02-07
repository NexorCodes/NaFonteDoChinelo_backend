const { getFrete } = require("../util");

module.exports = {
    async get (request, response) {
        const { cepOrigem, cep, peso, comprimento, altura, largura, diametro } = request.body;

        if(!cepOrigem || !cep || !peso || !comprimento || !altura || !largura || !diametro)
        return response.status(400).json({ error: "Preencha todos os campos" });

        try {
            const frete = await getFrete(cepOrigem, cep, peso, comprimento, altura, largura, diametro);
            return response.status(200).json({ ok: true, frete });
            
        } catch (error) {
            return response.status(400).json({ ok: false, error });     
        }
    }
}