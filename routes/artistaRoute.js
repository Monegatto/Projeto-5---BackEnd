const express = require('express')
const router = express.Router()
const artistaController = require('../controller/artistaController')
const autenticação = require('../middleware/autenticação')

router.post('/createArtista', autenticação, artistaController.createArtista)

router.get('/getArtistas?', artistaController.getArtistas)

router.get('/getArtista/:id', artistaController.getArtista)

router.put('/updateArtista/:id', autenticação, artistaController.updateArtista)

router.delete('/deleteArtista/:id', autenticação, artistaController.deleteArtista)

module.exports = router