const mongoose = require('mongoose')

const ClienteSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    valor: {
        type: String
    },
    data: {
        type: String
    }
})

module.exports = mongoose.model('cliente', ClienteSchema)
