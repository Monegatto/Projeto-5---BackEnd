const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../config/bd")

const Musica = sequelize.define("Musica", {
    id_musica: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: DataTypes.STRING, allowNull: false},
    artista: {type: DataTypes.STRING, allowNull:false},
    album: {type: DataTypes.STRING, allowNull: false},
}, {

    tableName: 'Musica', //Nome da tabela no postgres

    timestamps: false // Não cria colunas de data de criação e atualização

});

module.exports = Musica