const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

router.get('/cadastro', (req, res) => {
  res.render('cad/cadastro')
})

router.post('/cad/nova', (req, res) => {
  var errors = []

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    errors.push({ texto: 'Nome inválido' })
  }

  if (req.body.nome.length < 2) {
    errors.push({ texto: 'Nome muito curto' })
  }

  if (
    !req.body.senha ||
    typeof req.body.senha == undefined ||
    req.body.senha == null
  ) {
    errors.push({ texto: 'Senha inválida' })
  }

  if (req.body.senha.length < 5) {
    errors.push({ texto: 'Senha muito curta' })
  }

  if (errors.length > 0) {
    res.render('cad/cadastro', { errors })
  } else {
    const novoUsuario = {
      nome: req.body.nome,
      senha: req.body.senha,
    }
    new Usuario(novoUsuario)
      .save()
      .then(() => {
        req.status(201).json()
        res.redirect('/')
      })
      .catch(err => {
        req.status(400).json(err.message)
        res.redirect('cad/cadastro')
      })
  }
})

module.exports = router
