const express = require('express')
const router = express.Router()
const sequelize = require('../config/bd')
const Album = require('../model/Album')
const Musica = require('../model/Musica')
const Artista =  require('../model/Artista')
const Usuario = require('../model/Usuario')

//Musicas que serão inseridas no sistema
const musicas1 = [
    'Dream Machine', 'I Am The Lightning', 'White Gold', 
    'Nowhere Kid', 'Never Ending Moment', 'Bad Blood', 
    'Natural Born Thriller', 'In The Night', 'Up To You'
]

const musicas2 = [
    'Mountains At Midnight', 'Shiner In The Dark', 'Pull Me Through', 
    'The Firing Line', 'Tell Me When It\'s Too Late', 'Triggers', 
    'How Many More Times', 'High Waters', 'There Goes My Cool', 'Waves'
]

const musicas3 = [
    'Obscenery', 'Paper Machete', 'Negative Space', 
    'Time & Place', 'Made to Parade', 'Carnavoyeur', 
    'What The Peephole Say', 'Sicily', 'Emotion Sickness', 
    'Straight Jacket Fitting'
]

const musicas4 = [
    'No One Loves Me and Neither Do I', 'Mind Eraser, No Chaser', 'New Fang',
    'Dead End Friends', 'Elephants',  'Scumbag Blues',
    'Bandoliers', 'Reptiles', 'Interlide with Ludes',
    'Warsaw or the First Breath You Take After You Give Up',
    'Caligulove', 'Gunman', 'Spinning in Daffodils'
]

const musicas5 = [
    'Too Good At Raising Hell', 'Pretty Vicius', 'I Won\'t Run',
    'Hands On Me', 'Do What You Want', 'Rockstar',
    'Remember The Name', 'Bad Decisions', 'Better Love',
    'Gimme Some Blood', 'Somebody Someday'
]

//Função para mapear os nomes das músicas e gerar os objetos
const criarMusicas = (nomes, artista, album) => 
    nomes.map(nome => ({
        nome,
        artista: artista.nome,
        album: album.nome,
        id_artista: artista.id_artista,
        id_album: album.id_album
    }))



//Rota de instalação
router.get('/install', async (req, res) => {
/*
#swagger.tags = ['Instalação']
#swagger.summary = 'Instala o banco de dados com dados iniciais'
#swagger.description = 'Endpoint para criar e popular o banco de dados com dados iniciais, incluindo artistas, álbuns, músicas e um usuário administrador.'
#swagger.responses[200] = {
    description: 'Banco de dados criado e populado com sucesso.',
    schema: {
        type: 'string',
        example: 'Banco de dados criado'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao criar e popular o banco de dados.',
    schema: {
        type: 'string',
        example: 'Erro ao popular o banco de dados -> erro.message'
    }
}
*/
    try{ 
        //Cria o banco de dados por meio do sync
        await sequelize.sync({force: true})

        //Popula as tabelas criadas
        const artistas = await Artista.bulkCreate([
            {nome: 'Des Rocs', ano_inicio: 2018, pais_origem: 'Estado Unidos', genero_musical: 'Hard Rock'},
            {nome: 'Royal Blood', ano_inicio: 2011, pais_origem: 'Reino Unido', genero_musical: 'Hard Rock'},
            {nome: 'Queens of the Stone Age', ano_inicio: 1996, pais_origem: 'Estados Unidos', genero_musical: 'Desert Rock/Palm Desert Scene'},
            {nome: 'Them Crooked Vultures', ano_inicio: 2009, pais_origem: 'Estados Unidos', genero_musical: 'Stoner Rock'},
            {nome: 'The Struts', ano_inicio: 2012, pais_origem: 'Reino Unido', genero_musical: 'Glam Rock'}
        ])

        const albuns = await Album.bulkCreate([
            {nome: 'Dream Machine',  artista: artistas[0].nome, quantidade_musicas: 9, ano_lancamento: 2023, id_artista: artistas[0].id_artista},
            {nome: 'Back to The Water Below',  artista: artistas[1].nome, quantidade_musicas: 11, ano_lancamento: 2021, id_artista: artistas[1].id_artista},
            {nome: 'In Times New Roman...',  artista: artistas[2].nome, quantidade_musicas: 10, ano_lancamento: 2023, id_artista: artistas[2].id_artista},
            {nome: 'Them Crooked Vultures',  artista: artistas[3].nome, quantidade_musicas: 13, ano_lancamento: 2003, id_artista: artistas[3].id_artista},
            {nome: 'Pretty Vicious',  artista: artistas[4].nome, quantidade_musicas: 11, ano_lancamento: 2023, id_artista: artistas[4].id_artista}
        ])

        // Combina todos os arrays de músicas
        const musicas = [
        ...criarMusicas(musicas1, artistas[0], albuns[0]),
        ...criarMusicas(musicas2, artistas[1], albuns[1]),
        ...criarMusicas(musicas3, artistas[2], albuns[2]),
        ...criarMusicas(musicas4, artistas[3], albuns[3]),
        ...criarMusicas(musicas5, artistas[4], albuns[4])
]

        await Musica.bulkCreate(musicas)

        await Usuario.create({username: 'adm', senha: 123, adm: true})

        res.status(200).send('Banco de dados criado')
    } catch(error) {
        res.status(500).send('Erro ao popular o banco de dados -> '+error.message)
    }
})

module.exports = router