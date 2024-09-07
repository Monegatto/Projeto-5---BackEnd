const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/bd')

const Usuario = sequelize.define('Usuario', {
    id_usuario: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allwNull: false, unique: true},
    senha: {type: DataTypes.INTEGER, allowNull: false},
    adm: {type: DataTypes.BOOLEAN, allowNull: false},
    qtd_acessos: {type: DataTypes.INTEGER, allowNull: false}
}, {
    tableName: 'Usuario',   //Nome da tabela no postgres

    timestamps: false,  //Não cria colunas de data de criação e atualização
})

module.exports = Usuario