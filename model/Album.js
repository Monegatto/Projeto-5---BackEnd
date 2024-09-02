const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/bd')

const Album = sequelize.define('Album', {
    id_album: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: DataTypes.STRING, allowNull: false},
    artista: {type: DataTypes.STRING, allowNull:false},
    quantidade_musicas: {type: DataTypes.INTEGER, allowNull: false},
    ano_lancamento: {type: DataTypes.INTEGER, allowNull: false},
    id_artista: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Artista', key: 'id_artista'}, onDelete: 'CASCADE'}
}, {
    tableName: 'Album', //Nome da tabela no postgres

    timestamps: false, // Não cria colunas de data de criação e atualização

    indexes: [
        {
            unique: true,
            fields: ['nome', 'artista'] //Unicidade composta
        }
    ]
});

module.exports = Album