const express = require('express')
const router = express.Router()
const musicaController = require('../controller/musicaController')
const autenticação = require('../middleware/autenticação')

router.post('/createMusica', autenticação, musicaController.createMusica)

router.get('/getMusicas?', musicaController.getMusicas)

router.get('/getMusica/:id', musicaController.getMusica)

router.get('/getMusicasByArtista/:nomeArtista?', musicaController.getMusicasByArtista)

router.get('/getMusicasByAlbum/:nomeAlbum?', musicaController.getMusicaByAlbum)

router.put('/updateMusica/:id', autenticação, musicaController.updateMusica)

router.delete('/deleteMusica/:id', autenticação, musicaController.deleteMusica)

module.exports = router