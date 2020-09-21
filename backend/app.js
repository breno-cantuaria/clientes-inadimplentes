const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')
 
// Base de dados
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: Date, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})
 
// Rota antiga
Client.register(server, '/clients')

// Nova rota
//server.use('/api/clientes', require('./routes/cliente'))
 
// Rodando o servidor
server.listen(3000)