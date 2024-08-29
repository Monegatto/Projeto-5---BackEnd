const express = require('express')
const Artista = require('../model/Artista')

//Função que armazena um novo artista no sistema
exports.createArtista = async (req, res) => {
    try{
        const {nome, ano_inicio, pais_origem, genero_musical} = req.body

        const artista = await Artista.create({nome, ano_inicio, pais_origem, genero_musical})

        res.status(200).send('Artista '+artista.nome+' criado com sucesso')
    } catch(error){
        res.status(500).send('Erro ao criar o artista -> '+error)
    }
}

//Função que retorna todos os artistas no sistema
exports.getArtistas = async(req, res) => {
    try{
        const artistas = await Artista.findAll({})
        res.status(201).json(artistas)
    } catch(error){
        res.status(501).send('Erro ao buscar os artistas -> '+error)
    }
}

//Função que retorna um artista específico
exports.getArtista = async(req, res) => {
    const {id} = req.params
    try{
        const artista = await Artista.findByPk(id)

        if(!artista)
            return res.status(502).send('Artista não existe')

        res.status(202).json(artista)
    }catch(error){
        res.status(503).send('Erro ao encontrar o artista de id '+id+'com erro '+error)
    } 
}

//Função que atualiza um artista
exports.updateArtista = async(req, res) => {
    const {id} = req.params
    try{
        const artista = await Artista.findByPk(id)

        if(!artista)
            return res.status(504).send('Artista não existe')

        await artista.update(req.body)
        res.status(203).json(artista)
    } catch(error) {
        res.status(505).send('Erro ao atualizar o artista -> '+error)
    }
}

//Função que apaga o artista
exports.deleteArtista = async(req, res) => {
    const {id} = req.params
    try {
        const artista = await Artista.findByPk(id)
        if(!artista)
            return res.status(506).send('Artista não existe')

        await artista.destroy()
        res.status(204).send('Artista apagado')
    }catch(error){
        res.status(507).send('Artista não pôde ser apagado -> '+error)
    }
}