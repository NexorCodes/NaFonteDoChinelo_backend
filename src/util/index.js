const { calcularPrecoPrazo } = require('correios-brasil');

const getFrete = async (cepOrigem, cep, peso, comprimento, altura, largura, diametro) => {
    return new Promise((resolve, reject) => {
        if(largura < 10) {
            return reject({ error: "A largura não pode ser menor que 10cm" });
        }
        if(comprimento < 15) {
            return reject({ error: "O comprimento não pode ser menor que 15cm" });
        }
        
        let args = {
            sCepOrigem: cepOrigem,
            sCepDestino: cep,
            nVlPeso: peso,
            nCdFormato: '1',
            nVlComprimento: comprimento,
            nVlAltura: altura,
            nVlLargura: largura,
            nCdServico: ['04014', '04510', '40290'],
            nVlDiametro: '15',
        }
         
        calcularPrecoPrazo(args)
        .then(result => {
            var new_result = result
            new_result.forEach(data => {
                switch (data.Codigo) {
                    case '04014':
                        data.NomeServico = 'SEDEX'
                        break;
                    case '04510':
                        data.NomeServico = 'PAC'
                        break;
                    case '40290':
                        data.NomeServico = 'SEDEX 10'
                        break;
                    default:
                        break;
                }
            })
            resolve(new_result);
        })
        .catch(error => {
          reject(error);
        });
    });
}

module.exports = {
    getFrete
}