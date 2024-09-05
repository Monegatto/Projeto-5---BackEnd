const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

//Middleware para autenticação das rotas
module.exports = (req, res, next) => {
    const token = req.headers['administrador']

    if(!token)
        return res.status(404).send('Token não existe, certifique-se de que o login foi realizado e o token foi capturado')

    try{
        const validado = jwt.verify(token, process.env.SECRET)

        req.user = validado

        next()
    }catch(error){
        res.status(500).send('Erro na validação do token -> '+error)
    }
}