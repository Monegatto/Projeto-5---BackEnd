const express = require('express')
const router = express.Router()
const artistaController = require('../controller/artistaController')

router.post('/createArtista', artistaController.createArtista)

router.get('/getArtistas/:limite/:pagina', artistaController.getArtistas)

router.get('/getArtista/:id', artistaController.getArtista)

router.put('/updateArtista/:id', artistaController.updateArtista)

router.delete('/deleteArtista/:id', artistaController.deleteArtista)

module.exports = router