const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const Cliente = require('../models/Cliente')

// @route   GET api/clientes
// @desc    Get de todos os clientes
// @access  Public
router.get('/', async(req, res) => {
    try {
        const clientes = await Cliente.find(req.clientes).sort({ data: -1 })
        res.json(clientes)
    } catch (erro) {
        console.error(erro.message)
        res.status(500).send('Erro de servidor')
    }
})

// @route   POST api/cliente
// @desc    Adiciona cliente
// @access  Private
router.post(
    '/', 
    [   
        check('nome', 'Nome é necessário').not().isEmpty()
    ],
    async (req, res) => {
        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() })
        }

        const { nome, valor, data } = req.body

        try {
            const novoCliente = new Cliente({
                nome,
                valor,
                data
            })

            const cliente = await novoCliente.save()
            res.json(cliente)
        } catch (erro) {
            console.error(erro.message)
            res.status(500).send('Erro de servidor')
        }
    }
)

// @route   PUT api/clientes/:id
// @desc    Atualiza Cliente
// @access  Public
router.put('/:id', async (req, res) => {
    const { nome, valor, data } = req.body

    //Monta o objeto cliente
    const camposCliente = {}

    if (nome) camposCliente.nome = nome
    if (valor) camposCliente.valor = valor
    if (data) camposCliente.data = data

    try {
        let cliente = await Cliente.findById(req.params.id)

        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente não encontrado' })
        }

        cliente = await Cliente.findOneAndUpdate(
            req.params.id,
            { $set: camposCliente },
            { new: true }
        )
        res.json(cliente)
    } catch (erro) {
        console.error(erro.message)
        res.status(500).send('Erro de servidor')
    }
})

// @route   DELETE api/clientes/:id
// @desc    Remove cliente
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id)

        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente não encontrado' })
        }

        await Cliente.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Cliente removido' })
    } catch (erro) {
        console.error(erro.message)
        res.status(500).send('Erro de servidor')
    }
})

module.exports = router