const Usuario = require('../model/Usuario')
const jwt = require('jsonwebtoken')

//Função que permite o cadastro de usuário simples
exports.registerUser = async (req, res) => {
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Cadastro de um novo usuário'
#swagger.description = 'Endpoint para cadastrar um novo usuário no sistema. O usuário será criado com permissão padrão (não administrador).'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Informações do usuário a ser criado.',
    schema: {
        type: 'object',
        properties: {
            username: { type: 'string', example: 'novo_usuario' },
            senha: { type: 'string', example: 'senha123' }
        },
        required: ['username', 'senha']
    }
}
#swagger.responses[200] = {
    description: 'Usuário criado com sucesso.',
    schema: {
        type: 'string',
        example: 'Usuario criado com sucesso'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao criar o usuário.',
    schema: {
        type: 'string',
        example: 'Erro ao criar o usuario -> erro'
    }
}
*/
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
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Cadastro de um usuário administrador'
#swagger.description = 'Endpoint para cadastrar um novo usuário como administrador. Requer que o usuário logado seja um administrador.'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Informações do usuário administrador a ser criado.',
    schema: {
        type: 'object',
        properties: {
            username: { type: 'string', example: 'admin_usuario' },
            senha: { type: 'string', example: 'senha123' }
        },
        required: ['username', 'senha']
    }
}
#swagger.responses[200] = {
    description: 'Usuário administrador criado com sucesso.',
    schema: {
        type: 'string',
        example: 'Usuario administrador criado com sucesso'
    }
}
#swagger.responses[403] = {
    description: 'Acesso negado, usuário não é administrador.',
    schema: {
        type: 'string',
        example: 'O usuário logado precisa ser um administrador'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao criar o usuário administrador.',
    schema: {
        type: 'string',
        example: 'Erro ao criar o usuário administrador -> erro'
    }
}
*/
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
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Modificação do próprio usuário'
#swagger.description = 'Endpoint que permite a modificação dos dados do próprio usuário logado.'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados do usuário a serem atualizados.',
    schema: {
        type: 'object',
        properties: {
            senha: { type: 'string', example: 'nova_senha123' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Usuário editado com sucesso.',
    schema: {
        type: 'string',
        example: 'Usuario editado com sucesso'
    }
}
#swagger.responses[403] = {
    description: 'Acesso negado, usuário não logado.',
    schema: {
        type: 'string',
        example: 'Nenhum usuário logado, faça o login'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao modificar o usuário.',
    schema: {
        type: 'string',
        example: 'Erro ao modificar o usuário -> erro'
    }
}
*/
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
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Modificação de outro usuário por um administrador'
#swagger.description = 'Endpoint que permite a um administrador modificar os dados de outros usuários.'
#swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário a ser modificado.',
    required: true,
    type: 'integer'
}
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados do usuário a serem atualizados.',
    schema: {
        type: 'object',
        properties: {
            senha: { type: 'string', example: 'nova_senha123' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Usuário informado editado com sucesso.',
    schema: {
        type: 'string',
        example: 'Usuário informado editado com sucesso'
    }
}
#swagger.responses[403] = {
    description: 'Acesso negado, usuário não é administrador.',
    schema: {
        type: 'string',
        example: 'O usuário logado precisa ser um administrador'
    }
}
#swagger.responses[404] = {
    description: 'Usuário informado não encontrado.',
    schema: {
        type: 'string',
        example: 'Usuário informado não encontrado'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao modificar o usuário informado.',
    schema: {
        type: 'string',
        example: 'Erro ao modificar o usuário informado -> erro'
    }
}
*/
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
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Exclusão do próprio usuário'
#swagger.description = 'Endpoint que permite a exclusão da conta do próprio usuário logado.'
#swagger.responses[200] = {
    description: 'Usuário apagado com sucesso.',
    schema: {
        type: 'string',
        example: 'Usuario apagado com sucesso'
    }
}
#swagger.responses[403] = {
    description: 'Acesso negado, usuário não logado.',
    schema: {
        type: 'string',
        example: 'Nenhum usuário logado, faça o login'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao apagar o usuário logado.',
    schema: {
        type: 'string',
        example: 'Erro ao apagar o usuário logado -> erro'
    }
}
*/
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
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Exclusão de outro usuário por um administrador'
#swagger.description = 'Endpoint que permite a um administrador excluir outros usuários.'
#swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário a ser excluído.',
    required: true,
    type: 'integer'
}
#swagger.responses[200] = {
    description: 'Usuário informado apagado com sucesso.',
    schema: {
        type: 'string',
        example: 'Usuário informado apagado com sucesso'
    }
}
#swagger.responses[403] = {
    description: 'Acesso negado, usuário não é administrador.',
    schema: {
        type: 'string',
        example: 'O usuário logado precisa ser um administrador'
    }
}
#swagger.responses[404] = {
    description: 'Usuário informado não encontrado.',
    schema: {
        type: 'string',
        example: 'Usuário informado não encontrado'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao apagar o usuário informado.',
    schema: {
        type: 'string',
        example: 'Erro ao apagar o usuário informado -> erro'
    }
}
*/
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
/*
#swagger.tags = ['Usuários']
#swagger.summary = 'Login de usuário'
#swagger.description = 'Endpoint para autenticação de usuário. Retorna um token JWT se o login for bem-sucedido.'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Credenciais do usuário para login.',
    schema: {
        type: 'object',
        properties: {
            username: { type: 'string', example: 'usuario' },
            senha: { type: 'string', example: 'senha123' }
        },
        required: ['username', 'senha']
    }
}
#swagger.responses[200] = {
    description: 'Token JWT gerado com sucesso.',
    schema: {
        type: 'object',
        properties: {
            token: { type: 'string' }
        }
    }
}
#swagger.responses[401] = {
    description: 'Credenciais inválidas.',
    schema: {
        type: 'string',
        example: 'Usuario não encontrado. Verifique o username e a senha'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao fazer o login.',
    schema: {
        type: 'string',
        example: 'Erro ao fazer o login -> erro'
    }
}
*/
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