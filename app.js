const express = require('express')
const cors = require('cors')//permite recibir peticiones de otros dominios 
const bodyParser = require('body-parser')//permite manipular fácilmente el body de las peticiones

const routes = require('./routes')//módulo que gestiona las rutas 
const app = express()

app.use((req, res, next) => {
     res.header("Access-Control-Allow-Origin", "*")
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
     next()
})

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false }))//tomar las peticiones y convertir su body a objetos usables
app.use(bodyParser.json())//el formato de conversión será json

app.use('/api/v1', routes.router)

module.exports = app
