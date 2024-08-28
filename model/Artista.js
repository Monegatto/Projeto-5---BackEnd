const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../config/bd")

const Artista = sequelize.define("Artista", {
    id_artista: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: DataTypes.STRING, allowNull: false},
    ano_inicio: {type: DataTypes.INTEGER, allowNull: false},
    pais_origem: {type: DataTypes.STRING, allowNull: false},
    genero_musical: {type: DataTypes.STRING, allowNull: false}
}, {

    tableName: 'Artista', //Nome da tabela no postgres

    timestamps: false // Não cria colunas de data de criação e atualização

})

module.exports = Artista