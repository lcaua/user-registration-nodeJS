const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

router.get("/cadastro", (req,res) => {
    res.render("cad/cadastro")
})

router.post("/cad/nova", (req,res) => {
   
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
         erros.push({texto: "Nome Inválido"})
    }

    if(req.body.nome.length <2){
        erros.push({texto: "Nome Muito Curto"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha Invalida"})
    }
    
    if(req.body.senha.length <5){
        erros.push({texto: "Senha muito Curta"})
    }


    if(erros.length > 0){
        res.render("cad/cadastro", {erros: erros})
    }else{
         const novoUsuario = {
       nome: req.body.nome,
       senha: req.body.senha
   }
   new Usuario(novoUsuario).save().then(() => {
       req.flash("success_msg", "Usuario Cadastrado com Sucesso")
       res.redirect("/")
   }).catch((err) => {
       req.flash("error_msg", "Houve um erro ao se Cadastrar Tente Novamente!")
       res.redirect("cad/cadastro")
   })
    }   
})

module.exports = router