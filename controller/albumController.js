const express = require('express');
const Album = require('../model/Album')
const Artista = require('../model/Artista')

//Função que armazena um novo álbum no sistema, requer que o artista já esteja presente
exports.createAlbum = async (req, res) => {
    try{
        const {nome, artista, quantidade_musicas, ano_lancamento} = req.body
        const {id_artista} = await Artista.findOne({where: {nome: artista}})
        if(!id_artista)
            return res.status(500).send(artista+' não existe no sistema')

        const album = await Album.create({nome, artista, quantidade_musicas, ano_lancamento, id_artista})

        res.status(200).send('Album '+ album.nome +' armazenado com sucesso')

    }catch(error){
        res.status(501).send('Erro ao armazenar o album -> '+error)
    }
}

//Função que retorna todos os albuns no sistema
exports.getAlbuns = async(req, res) => {
    try {
        const albuns = await Album.findAll({})
        res.status(201).json(albuns)
    } catch(error){
        res.status(502).send('Erro ao buscar os albuns -> '+error)
    }
}

//Função que retorna um álbum específico
exports.getAlbum = async (req, res) => {
    const {id} = req.params
    try {
        const album = await Album.findByPk(id)
        if(!album)
            return res.status(503).send('Album não existe')

        res.status(202).json(album)
    } catch(error){
        res.status(504).send('Erro ao encontrar album de id '+id+' com erro '+error)
    }
}

//Função que atualiza um álbum
exports.updateAlbum = async(req, res) => {
    const {id} = req.params
    try{
        const album = await Album.findByPk(id)

        if(!album)
            return res.status(505).send('Album não existe')

        await album.update(req.body)
        res.status(203).json(album)
    } catch(error) {
        res.status(506).send('Erro ao atualizar o álbum -> '+error)
    }
}

//Função que apaga um álbum
exports.deleteAlbum = async(req, res) => {
    const {id} = req.params
    try{
        const album = await Album.findByPk(id)
        if(!album)
            return res.status(507).send('Album não existe')
        
        await album.destroy()
        res.status(204).send('Album apagado')
    } catch(error){
        res.status(508).send('Album não pôde ser apagado')
    }
}