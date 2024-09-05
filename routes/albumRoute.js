const express = require('express')
const router = express.Router()
const albumController = require('../controller/albumController')
const autenticação = require('../middleware/autenticação')

router.post('/createAlbum', autenticação, albumController.createAlbum)

router.get('/getAlbuns/:limite/:pagina', albumController.getAlbuns)

router.get('/getAlbum/:id', albumController.getAlbum)

router.get('/getAlbumByArtista/:limite/:pagina?', albumController.getAlbumByArtista)

router.put('/updateAlbum/:id', autenticação, albumController.updateAlbum)

router.delete('/deleteAlbum/:id', autenticação, albumController.deleteAlbum)

module.exports = router