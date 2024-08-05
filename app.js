const express = require('express');
const app = express();
const mysql = require('mysql')
const rotas_usuarios = require("./routes/rotas_usuarios");

app.use(express.json());
app.use(express.static('js'));

app.use('/',express.static(__dirname+'/view'))

const porta = 3000;
const host ="http://localhost:" + porta;

const banco = mysql.createPool({
    connectionLimit:128,
    host:'localhost',
    user:'root',
    password:'root123',
    database:'sistema_usuarios'
})
rotas_usuarios(app,banco)
app.listen(porta,function(){
    console.log("Servidor rodando em " + porta);
});