const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuarioController')
const autenticação = require('../middleware/autenticação')

router.post('/registerUser', usuarioController.registerUser)

router.post('/registerUserAdmin', autenticação, usuarioController.registerUserAdmin)

router.put('/updateUser', autenticação, usuarioController.updateUser)

router.put('/updateUserAdmin/:id', autenticação, usuarioController.updateUserAdmin)

router.delete('/deleteUser', autenticação, usuarioController.deleteUser)

router.delete('/deleteUserAdmin/:id', autenticação, usuarioController.deleteUserAdmin)

router.post('/login', usuarioController.login)

module.exports = router