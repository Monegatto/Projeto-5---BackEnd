const express = require('express')
const Musica = require('../model/Musica')
const Album = require('../model/Album')
const Artista = require('../model/Artista')

//Função que armazena uma nova música no sistema, requer que ambos o artista e álbum já estejam presentes
exports.createMusica = async (req, res) => {
    try{
        const {nome, artista, album} = req.body
        const {id_artista} = await Artista.findOne({where: {nome: artista}})
        if(!id_artista)
            return res.status(500).send(artista+' não existe no sistema')

        const {id_album} = await Album.findOne({where: {nome: album}})
        if(!id_album)
            return res.status(501).send(album+' não existe no sistema')

        const musica = await Musica.create({nome, artista, album, id_artista, id_album})
        res.status(200).send('Musica '+musica.nome+'armazenada com sucesso')
    }catch(error){
        res.status(502).send('Erro ao armazenar a musica -> '+error)
    }
}

//Função que retorna todas as músicas no sistema
exports.getMusicas = async (req, res) => {
    try{
        const musicas = await Musica.findAll({})
        res.status(201).json(musicas)
    }catch(error){
        res.status(503).send('Erro ao buscar as músicas -> '+error)
    }
}

//Função que retorna uma música específica
exports.getMusica = async (req, res) => {
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(504).send('Musica não existe')

        res.status(202).json(musica)
    }catch(error){
        res.status(505).send('Erro ao encontrar musica de id '+id+' com erro +error')
    }
}

//Função que atualiza uma música
exports.updateMusica = async (req, res) => {
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)

        if(!musica)
            return res.status(506).json('Musica não existe')

        await musica.update(req.body)
        res.status(203).json(musica)
    }catch(error){
        res.attsu(507).josn('Erro ao atualizar a musica -> '+error)
    }
}

//Função que apaga uma musica
exports.deleteMusica = async (req, res) => {
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(508).json('Musica não existe')

        await musica.destroy()
        res.status(204).json('Musica apagada')
    }catch(error){
        res.status(509).json('Musica não pôde ser apagada')
    }
}