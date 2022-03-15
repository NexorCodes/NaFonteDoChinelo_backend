require('dotenv').config()
const https = require("https");
var fs = require("fs");
const path = require("path");

//Insira o caminho de seu certificado .p12 dentro de seu projeto
var certificado = fs.readFileSync(path.join(__dirname, "cert-prod.p12"));

//Insira os valores de suas credenciais em desenvolvimento do pix
var credenciais = {
  client_id: process.env.GERENCIANET_CLIENT_ID,
  client_secret: process.env.GERENCIANET_CLIENT_SECRET,
};

var data = JSON.stringify({ grant_type: "client_credentials" });
var data_credentials = credenciais.client_id + ":" + credenciais.client_secret;

// Codificando as credenciais em base64
var auth = Buffer.from(data_credentials).toString("base64");

const agent = new https.Agent({
  pfx: certificado,
  passphrase: "",
});
//Consumo em desenvolvimento da rota post oauth/token
var config = {
  method: "POST",
  url: `${process.env.GERENCIANET_BASE_URL}/oauth/token`,
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
  httpsAgent: agent,
  data: data,
};

module.exports = config