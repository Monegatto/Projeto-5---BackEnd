var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const installRotas = require("./config/install")          //Rota que cria e popula as tabelas

var indexRouter = require('./routes/main');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(installRotas)                                       //Criação das tabelas

app.use('/', indexRouter);

module.exports = app;
