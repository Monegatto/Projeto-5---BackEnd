const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../config/bd')

const Musica = sequelize.define('Musica', {
    id_musica: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: DataTypes.STRING, allowNull: false},
    artista: {type: DataTypes.STRING, allowNull:false},
    album: {type: DataTypes.STRING, allowNull: false},
    id_artista: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Artista', key: 'id_artista'}, onDelete: 'CASCADE'},
    id_album: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Album', key: 'id_album'}, onDelete: 'CASCADE'}
}, {
    tableName: 'Musica', //Nome da tabela no postgres

    timestamps: false // Não cria colunas de data de criação e atualização
});

module.exports = Musica