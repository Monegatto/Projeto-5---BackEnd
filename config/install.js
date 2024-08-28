const express = require("express")
const router = express.Router()
const sequelize = require("../config/bd")
const Album = require("../model/Album")
const Musica = require("../model/Musica")
const Artista =  require("../model/Artista")

//Relacionamento entre as tabelas
Artista.hasMany(Album)
Album.belongsTo(Artista)

Album.hasMany(Musica)
Musica.belongsTo(Album)

Musica.belongsToMany(Artista, { through: 'ArtistaMusica'})
Artista.belongsToMany(Musica, {through: 'ArtistaMusica'})

//Rota de instalação
router.get('/install', async (req, res) => {
    try{ 
        await sequelize.sync({force: true})        //Cria o banco de dados por meio do sync                                       

        //Popula as tabelas criadas
        const artistas = await Artista.bulkCreate([
            {nome: 'Des Rocs', ano_inicio: 2018, pais_origem: 'Estado Unidos', genero_musical: 'Hard Rock'},
            {nome: 'Royal Blood', ano_inicio: 2011, pais_origem: 'Reino Unido', genero_musical: 'Hard Rock'},
            {nome: 'Queens of the Stone Age', ano_inicio: 1996, pais_origem: 'Estados Unidos', genero_musical: 'Desert Rock/Palm Desert Scene'},
            {nome: 'Muse', ano_inicio: 1994, pais_origem: 'Reino Unido', genero_musical: 'Progressive Rock'},
            {nome: 'The Struts', ano_inicio: 2012, pais_origem: 'Reino Unido', genero_musical: 'Glam Rock'}
        ])

        const albuns = await Album.bulkCreate([
            {nome: 'Dream Machine',  artista: artistas[0].nome, quantidade_musicas: 9, ano_lancamento: 2023},
            {nome: 'Typhoons',  artista: artistas[1].nome, quantidade_musicas: 11, ano_lancamento: 2021},
            {nome: 'In Times New Roman...',  artista: artistas[2].nome, quantidade_musicas: 10, ano_lancamento: 2023},
            {nome: 'Absolution',  artista: artistas[3].nome, quantidade_musicas: 15, ano_lancamento: 2003},
            {nome: 'Pretty Vicious',  artista: artistas[4].nome, quantidade_musicas: 11, ano_lancamento: 2023}
        ])

        const musicas = await Musica.bulkCreate([
            {nome: 'I Am The Lightning', artista: artistas[0].nome, album: albuns[0].nome},
            {nome: 'Oblivion',  artista: artistas[1].nome,  album: albuns[1].nome},
            {nome: 'Sicily',  artista: artistas[2].nome,  album: albuns[2].nome},
            {nome: 'Stockholm Syndrome',  artista: artistas[3].nome,  album: albuns[3].nome},
            {nome: 'Too Good At Raising Hell',  artista: artistas[4].nome,  album: albuns[4].nome}
        ])

        await artistas[0].addMusicas([musicas[0]]);
        await artistas[1].addMusicas([musicas[1]]);
        await artistas[2].addMusicas([musicas[2]]);
        await artistas[3].addMusicas([musicas[3]]);
        await artistas[4].addMusicas([musicas[4]]);

        res.status(200).send('Banco de dados criado')

    } catch(error) {
        res.status(500).send('Erro ao popular o banco de dados ' +error.message)
    }

})

module.exports = router