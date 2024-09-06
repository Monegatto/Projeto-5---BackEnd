const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

// Define o caminho para o arquivo swagger
const swaggerFilePath = path.join(__dirname, '../swagger_doc.json')

// Rota GET para exibir a documentação gerada pelo swagger
router.get('/docs', async (req, res) => {
    try {
      const data = await fs.promises.readFile(swaggerFilePath, 'utf-8')

      res.status(200).send(data)
    } catch (error) {
      res.status(500).send('Erro ao ler o arquivo Swagger -> '+error)
    }
  })

module.exports = router
