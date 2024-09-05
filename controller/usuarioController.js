const Usuario = require('../model/Usuario')
const jwt = require('jsonwebtoken')

//Função que permite o cadastro de usuário simples
exports.registerUser = async (req, res) => {
    try{
        const {username, senha} = req.body

        await Usuario.create({username, senha, adm: false})

        res.status(200).send('Usuario criado com sucesso')
    } catch(error){
        res.status(500).send('Erro ao criar o usuario -> '+error)
    }
}

//Função que permite o cadastro de um usuário administrador
exports.registerUserAdmin = async (req, res) => {
    if(req.user.adm == false)
        return res.status(403).send('O usuário logado precisa ser um administrador')
    try{
        const {username, senha} = req.body

        await Usuario.create({username, senha, adm: true})

        res.status(200).send('Usuario administrador criado com sucesso')        
    }catch(error){
        res.status(500).send('Erro ao criar o usuário administrador -> '+error)
    }
}

//Função que permite o usuário modificar a si mesmo
exports.updateUser = async (req, res) => {
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    try{
        const user = await Usuario.findOne({where: {username: req.user.username}})
        
        await user.update(req.body)
        res.status(200).send('Usuario editado com sucesso')
    }catch(error){
        res.status(500).send('Erro ao modificar o usuário -> '+error)
    }
}

//Função que permite o administrador modificar outros usuários
exports.updateUserAdmin = async (req, res) => {
    if(req.user.adm == false)
        return res.status(403).send('O usuário logado precisa ser um administrador')
    const {id} = req.params
    try{
        const user = await Usuario.findByPk(id)
        if(!user)
            return res.status(404).send('Usuário informado não encontrado')
        await user.update(req.body)
        res.status(200).send('Usuário informado editado com sucesso')
    }catch(error){
        res.status(500).send('Erro ao modificar o usuário informado -> '+error)
    }
}

//Função que permite exclusão do usuário logado
exports.deleteUser = async (req, res) => {
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    try{
        const user = await Usuario.findOne({where: {username: req.user.username}})
        await user.destroy()
        res.status(200).send('Usuario apagado com sucesso')
    }catch(error){
        res.status(500).send('Erro ao apagar o usuário logado -> '+error)
    }
}

//Função que permite ao administrador a excluir outras contas
exports.deleteUserAdmin = async (req, res) => {
    if(req.user.adm == false)
        return res.status(403).send('O usuário logado precisa ser um administrador')
    const {id} = req.params
    try{
        const user = await Usuario.findByPk(id)
        if(!user)
            return res.status(404).send('Usuário informado não encontrado')
        await user.destroy()
        res.status(200).send('Usuário informado apagado com sucesso')
    }catch(error){
        res.status(500).send('Erro ao apagar o usuário informado -> '+error)
    }
}

//Função de login
exports.login = async (req, res) => {
    try{
        const {username, senha} = req.body

        const usuario = await Usuario.findOne({where: {username: username, senha: senha}})

        if(!usuario){
            return res.status(401).send('Usuario não encontrado. Verifique o username e a senha')
        }

        let payload ={
            id_usuario: usuario.id_usuario,
            username: usuario.username,
            adm: usuario.adm
        }

        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})

        res.json({token})
    } catch(error){
        res.status(500).send('Erro ao fazer o login -> '+error)
    }
}