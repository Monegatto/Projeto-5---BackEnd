var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const installRotas = require('./config/install')            //Rota que cria e popula as tabelas
const albumRouter = require('./routes/albumRoute');         //Rota com as operações pertinentes aos albuns
const artistaRouter = require('./routes/artistaRoute')      //Rota com as operações pertinentes aos artistas
const musicasRouter = require('./routes/musicaRoute')       //Rota com as operações pertinentes às musicas

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(installRotas)                                       //Criação das tabelas
app.use(albumRouter)                                        //Operações com os albuns
app.use(artistaRouter)                                      //Operações com os artistas
app.use(musicasRouter)                                      //Operações ocm as músicas

module.exports = app;
