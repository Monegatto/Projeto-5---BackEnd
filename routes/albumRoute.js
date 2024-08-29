const express = require('express')
const router = express.Router()
const albumController = require('../controller/albumController')

router.post('/createAlbum', albumController.createAlbum)

router.get('/getAlbuns', albumController.getAlbuns)

router.get('/getAlbum/:id', albumController.getAlbum)

router.put('/updateAlbum/:id', albumController.updateAlbum)

router.delete('/deleteAlbum/:id', albumController.deleteAlbum)

module.exports = router