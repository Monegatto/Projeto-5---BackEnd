const express = require('express');
const Album = require('../model/Album')
const Artista = require('../model/Artista')

//Função que armazena um novo álbum no sistema, requer que o artista já esteja presente
exports.createAlbum = async (req, res) => {
    try{
        const {nome, artista, quantidade_musicas, ano_lancamento} = req.body
        const artistaExiste = await Artista.findOne({where: {nome: artista}})
        if(!artistaExiste)
            return res.status(404).send(artista+' não existe no sistema')

        const {id_artista} = artistaExiste
        const album = await Album.create({nome, artista, quantidade_musicas, ano_lancamento, id_artista})

        res.status(200).send('Album '+ album.nome +' armazenado com sucesso')

    }catch(error){
        res.status(500).send('Erro ao armazenar o album -> '+error)
    }
}

//Função que retorna todos os albuns no sistema
exports.getAlbuns = async(req, res) => {
    try {
        const {limite, pagina} = req.params

        if(!limite || !pagina)
            return res.status(400).send('Verifique se você enviou ambos o limite de entradas (primeiro parâmetro) e a página inicial (segindo paraâmetro) na URL')

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina);

        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const albuns = await Album.findAll({limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(albuns)
    } catch(error){
        res.status(500).send('Erro ao buscar os albuns -> '+error)
    }
}

//Função que retorna um álbum específico
exports.getAlbum = async (req, res) => {
    const {id} = req.params
    try {
        const album = await Album.findByPk(id)
        if(!album)
            return res.status(404).send('Album não existe')

        res.status(200).json(album)
    } catch(error){
        res.status(500).send('Erro ao encontrar album de id '+id+' com erro '+error)
    }
}

//Função que retorna todos os albuns de um artista específico
exports.getAlbumByArtista = async (req, res) => {
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

        const albuns = await Album.findAll({where: {artista: nomeArtista}, limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(albuns)
    } catch(error){
        res.status(500).send('Erro ao encontrar album do artista '+nomeArtista+' com erro '+error)
    }
}

//Função que atualiza um álbum
exports.updateAlbum = async(req, res) => {
    const {id} = req.params
    try{
        const album = await Album.findByPk(id)

        if(!album)
            return res.status(404).send('Album não existe')

        await album.update(req.body)
        res.status(200).json(album)
    } catch(error) {
        res.status(500).send('Erro ao atualizar o álbum -> '+error)
    }
}

//Função que apaga um álbum
exports.deleteAlbum = async(req, res) => {
    const {id} = req.params
    try{
        const album = await Album.findByPk(id)
        if(!album)
            return res.status(404).send('Album não existe')
        
        await album.destroy()
        res.status(200).send('Album apagado')
    } catch(error){
        res.status(500).send('Album não pôde ser apagado')
    }
}