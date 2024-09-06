var express = require('express')
var path = require('path')

const installRotas = require('./config/install')            //Rota que cria e popula as tabelas
const albumRouter = require('./routes/albumRoute')          //Rota com as operações pertinentes aos albuns
const artistaRouter = require('./routes/artistaRoute')      //Rota com as operações pertinentes aos artistas
const musicasRouter = require('./routes/musicaRoute')       //Rota com as operações pertinentes às musicas
const usuarioRouter = require('./routes/usuarioRoute')      //Rota com as operações pertinentes aos usuários
const swaggerRoutes = require('./config/documentação')      //Rota que exibe a documentação swagger ao usuário

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(installRotas)                                       //Criação das tabelas
app.use(albumRouter)                                        //Operações com os albuns
app.use(artistaRouter)                                      //Operações com os artistas
app.use(musicasRouter)                                      //Operações com as músicas
app.use(usuarioRouter)                                      //Operações com os usuários
app.use(swaggerRoutes)                                      //Obtem a documentação da API gerada por swagger

module.exports = app
