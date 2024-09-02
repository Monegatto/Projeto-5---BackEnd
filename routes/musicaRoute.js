const express = require('express');
const router = express.Router();
const musicaController = require('../controller/musicaController')

router.post('/createMusica', musicaController.createMusica)

router.get('/getMusicas/:limite/:pagina', musicaController.getMusicas)

router.get('/getMusica/:id', musicaController.getMusica)

router.get('/getMusicasByArtista/:limite/:pagina?', musicaController.getMusicasByArtista)

router.get('/getMusicasByAlbum/:limite/:pagina?', musicaController.getMusicaByAlbum)

router.put('/updateMusica/:id', musicaController.updateMusica)

router.delete('/deleteMusica/:id', musicaController.deleteMusica)

module.exports = router;