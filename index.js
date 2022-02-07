require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')

const app = express()

const database = require('./src/database')
const router = require('./src/routes')

app.use(helmet({
    crossOriginEmbedderPolicy: false,
  }))
app.use(compression())
app.use(cors())
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(router)

app.get('*', (request, response) => {
    return response.status(200).json({ hey: "What's up!" })
})    


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at port: ${process.env.PORT}`)
})