const express = require('express')
const router = express.Router()
const musicaController = require('../controller/musicaController')
const autenticação = require('../middleware/autenticação')

router.post('/createMusica', autenticação, musicaController.createMusica)

router.get('/getMusicas/:limite/:pagina', musicaController.getMusicas)

router.get('/getMusica/:id', musicaController.getMusica)

router.get('/getMusicasByArtista/:limite/:pagina?', musicaController.getMusicasByArtista)

router.get('/getMusicasByAlbum/:limite/:pagina?', musicaController.getMusicaByAlbum)

router.put('/updateMusica/:id', autenticação, musicaController.updateMusica)

router.delete('/deleteMusica/:id', autenticação, musicaController.deleteMusica)

module.exports = router