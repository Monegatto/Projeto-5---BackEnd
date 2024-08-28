const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../config/bd")

const Album = sequelize.define("Album", {
    id_album: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: DataTypes.STRING, allowNull: false},
    artista: {type: DataTypes.STRING, allowNull:false},
    quantidade_musicas: {type: DataTypes.INTEGER, allowNull: false},
    ano_lancamento: {type: DataTypes.INTEGER, allowNull: false}
}, {

    tableName: 'Album', //Nome da tabela no postgres

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Album