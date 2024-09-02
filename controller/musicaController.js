const express = require('express')
const Musica = require('../model/Musica')
const Album = require('../model/Album')
const Artista = require('../model/Artista')

//Função que armazena uma nova música no sistema, requer que ambos o artista e álbum já estejam presentes
exports.createMusica = async (req, res) => {
    try{
        const {nome, artista, album} = req.body
        const artistaExiste = await Artista.findOne({where: {nome: artista}})
        if(!artistaExiste)
            return res.status(404).send(artista+' não existe no sistema')
        
        const albumExiste = await Album.findOne({where: {nome: album}})
        if(!albumExiste)
            return res.status(404).send(album+' não existe no sistema')

        const {id_artista} = artistaExiste
        const {id_album} = albumExiste
        const musica = await Musica.create({nome, artista, album, id_artista, id_album})
        res.status(200).send('Musica '+musica.nome+' armazenada com sucesso')
    }catch(error){
        res.status(500).send('Erro ao armazenar a musica -> '+error)
    }
}

//Função que retorna todas as músicas no sistema
exports.getMusicas = async (req, res) => {
    try{
        const {limite, pagina} = req.params

        if(!limite || !pagina){
            return res.status(400).send("Verifique se você enviou ambos o limite de entradas (primeiro parâmetro) e a página inicial (segindo paraâmetro) na URL")
        }

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina);

        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0)){
            res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')
        }

        const musicas = await Musica.findAll({limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(musicas)
    }catch(error){
        res.status(500).send('Erro ao buscar as músicas -> '+error)
    }
}

//Função que retorna uma música específica
exports.getMusica = async (req, res) => {
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(404).send('Musica não existe')

        res.status(200).json(musica)
    }catch(error){
        res.status(500).send('Erro ao encontrar musica de id '+id+' com erro +error')
    }
}

//Função que retorna todas musicas de um artista específico
exports.getMusicasByArtista = async (req, res) => {
    try{
        const {limite, pagina} = req.params
        const {nomeArtista} = req.query

        if(!limite || !pagina || !nomeArtista)
            return res.status(400).send('Verifique se você enviou o limite de entradas (primeiro parâmetro), a página inicial (segindo paraâmetro) e o nome do artista na URL')

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina);

        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const {id_artista} = await Artista.findOne({where: {nome: nomeArtista}})
        if(!id_artista)
            return res.status(404).send(nomeArtista+' não existe no sistema')

        const musicas = await Musica.findAll({where: {artista: nomeArtista}, limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(musicas)
    } catch(error){
        res.status(500).send('Erro ao encontrar a musica do artista '+nomeArtista+' com erro '+error)
    }
}

//Função que retorna todas as musicas de um album específico
exports.getMusicaByAlbum = async (req, res) => {
    try{
        const {limite, pagina} = req.params
        const {nomeAlbum} = req.query

        if(!limite || !pagina || !nomeAlbum){
            console.log(limite + pagina + nomeAlbum)
            return res.status(400).send('Verifique se você enviou o limite de entradas (primeiro parâmetro), a página inicial (segindo paraâmetro) e o nome do album na URL')
        }

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina);

        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const {id_album} = await Album.findOne({where: {nome: nomeAlbum}})
        if(!id_album)
            return res.status(404).send(nomeAlbum+' não existe no sistema')

        const musicas = await Musica.findAll({where: {album: nomeAlbum},limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(musicas)
    } catch(error){
        res.status(500).send('Erro ao encontrar musicas do album '+nomeAlbum+' com erro '+error)
    }
}

//Função que atualiza uma música
exports.updateMusica = async (req, res) => {
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)

        if(!musica)
            return res.status(404).json('Musica não existe')

        await musica.update(req.body)
        res.status(200).json(musica)
    }catch(error){
        res.attsu(500).josn('Erro ao atualizar a musica -> '+error)
    }
}

//Função que apaga uma musica
exports.deleteMusica = async (req, res) => {
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(404).send('Musica não existe')

        await musica.destroy()
        res.status(200).send('Musica apagada')
    }catch(error){
        res.status(500).send('Musica não pôde ser apagada')
    }
}