const express = require('express');
const router = express.Router();
const musicaController = require('../controller/musicaController')

router.post('/createMusica', musicaController.createMusica)

router.get('/getMusicas', musicaController.getMusicas)

router.get('/getMusica/:id', musicaController.getMusica)

router.put('/updateMusica/:id', musicaController.updateMusica)

router.delete('/deleteMusica/:id', musicaController.deleteMusica)

module.exports = router;