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
        const {limite, pagina} = req.params

        if(!limite || !pagina)
            return res.status(400).send('Verifique se você enviou ambos o limite de entradas (primeiro parâmetro) e a página inicial (segindo paraâmetro) na URL')

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina);

        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const artistas = await Artista.findAll({limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(artistas)
    } catch(error){
        res.status(500).send('Erro ao buscar os artistas -> '+error)
    }
}

//Função que retorna um artista específico
exports.getArtista = async(req, res) => {
    const {id} = req.params
    try{
        const artista = await Artista.findByPk(id)

        if(!artista)
            return res.status(404).send('Artista não existe')

        res.status(200).json(artista)
    }catch(error){
        res.status(500).send('Erro ao encontrar o artista de id '+id+'com erro '+error)
    } 
}

//Função que atualiza um artista
exports.updateArtista = async(req, res) => {
    const {id} = req.params
    try{
        const artista = await Artista.findByPk(id)
        if(!artista)
            return res.status(404).send('Artista não existe')

        await artista.update(req.body)
        res.status(200).json(artista)
    } catch(error) {
        res.status(500).send('Erro ao atualizar o artista -> '+error)
    }
}

//Função que apaga o artista
exports.deleteArtista = async(req, res) => {
    const {id} = req.params
    try {
        const artista = await Artista.findByPk(id)
        if(!artista)
            return res.status(404).send('Artista não existe')

        await artista.destroy()
        res.status(200).send('Artista apagado')
    }catch(error){
        res.status(500).send('Artista não pôde ser apagado -> '+error)
    }
}