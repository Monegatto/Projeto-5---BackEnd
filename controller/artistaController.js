const Artista = require('../model/Artista')

//Função que armazena um novo artista no sistema
exports.createArtista = async (req, res) => {
/*
#swagger.tags = ['Artistas']
#swagger.summary = 'Cria um novo artista'
#swagger.description = 'Endpoint para criar um novo artista no sistema.'
#swagger.parameters['Artista'] = {
    in: 'body',
    description: 'Dados do artista a ser criado.',
    schema: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Des Rocs' },
            ano_inicio: { type: 'integer', example: 2018 },
            pais_origem: { type: 'string', example: 'Estados Unidos' },
            genero_musical: { type: 'string', example: 'Hard Rock' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Artista criado com sucesso.',
    schema: {
        type: 'string',
        example: 'Artista Des Rocs criado com sucesso'
    }
}
#swagger.responses[401] = {
    description: 'Usuário não logado.',
    schema: {
        type: 'string',
        example: 'Nenhum usuário logado, faça o login'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao criar o artista.',
    schema: {
        type: 'string',
        example: 'Erro ao criar o artista -> erro'
    }
}
*/
    if(!req.user)
        return res.status(401).send('Nenhum usuário logado, faça o login')
    try{
        const {nome, ano_inicio, pais_origem, genero_musical} = req.body

        const artista = await Artista.create({nome, ano_inicio, pais_origem, genero_musical})

        res.status(200).send('Artista '+artista.nome+' criado com sucesso')
    } catch(error){
        res.status(500).send('Erro ao criar o artista -> '+error)
    }
}

//Função que retorna todos os artistas no sistema
exports.getArtistas = async(req, res) => {
/*
#swagger.tags = ['Artistas']
#swagger.summary = 'Retorna todos os artistas'
#swagger.description = 'Endpoint para retornar todos os artistas no sistema com paginação.'
#swagger.parameters['limite'] = { 
    in: 'query',
    description: 'Número máximo de artistas a serem retornados.',
    schema: { type: 'integer', example: 15 }
}
#swagger.parameters['pagina'] = { 
    in: 'query',
    description: 'Número da página para a paginação.',
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Lista de artistas retornada com sucesso.',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Des Rocs' },
                ano_inicio: { type: 'integer', example: 2018 },
                pais_origem: { type: 'string', example: 'Estados Unidos' },
                genero_musical: { type: 'string', example: 'Hard Rock' }
            }
        }
    }
}
#swagger.responses[400] = {
    description: 'Erro nos parâmetros de entrada.',
    schema: {
        type: 'string',
        example: 'Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao buscar os artistas.',
    schema: {
        type: 'string',
        example: 'Erro ao buscar os artistas -> erro'
    }
}
*/
    try{
        const {limite, pagina} = req.params

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina)
        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const artistas = await Artista.findAll({limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(artistas)
    } catch(error){
        res.status(500).send('Erro ao buscar os artistas -> '+error)
    }
}

//Função que retorna um artista específico
exports.getArtista = async(req, res) => {
/*
#swagger.tags = ['Artistas']
#swagger.summary = 'Retorna um artista específico'
#swagger.description = 'Endpoint para retornar um artista específico com base no ID.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID do artista a ser retornado.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Artista retornado com sucesso.',
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Des Rocs' },
            ano_inicio: { type: 'integer', example: 2018 },
            pais_origem: { type: 'string', example: 'Estados Unidos' },
            genero_musical: { type: 'string', example: 'Hard Rock' }
        }
    }
}
#swagger.responses[404] = {
    description: 'Artista não encontrado.',
    schema: {
        type: 'string',
        example: 'Artista não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao encontrar o artista.',
    schema: {
        type: 'string',
        example: 'Erro ao encontrar o artista de id 1 com erro -> erro'
    }
}
*/
    const {id} = req.params
    try{
        const artista = await Artista.findByPk(id)
        if(!artista)
            return res.status(404).send('Artista não existe')

        res.status(200).json(artista)
    }catch(error){
        res.status(500).send('Erro ao encontrar o artista de id '+id+'com erro -> '+error)
    } 
}

//Função que atualiza um artista
exports.updateArtista = async(req, res) => {
/*
#swagger.tags = ['Artistas']
#swagger.summary = 'Atualiza um artista'
#swagger.description = 'Endpoint para atualizar as informações de um artista existente.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID do artista a ser atualizado.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.parameters['Artista'] = {
    in: 'body',
    description: 'Dados do artista a serem atualizados.',
    schema: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Des Rocs' },
            ano_inicio: { type: 'integer', example: 2018 },
            pais_origem: { type: 'string', example: 'Estados Unidos' },
            genero_musical: { type: 'string', example: 'Hard Rock' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Artista atualizado com sucesso.',
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Des Rocs' },
            ano_inicio: { type: 'integer', example: 2018 },
            pais_origem: { type: 'string', example: 'Estados Unidos' },
            genero_musical: { type: 'string', example: 'Hard Rock' }
        }
    }
}
#swagger.responses[403] = {
    description: 'Usuário não logado.',
    schema: {
        type: 'string',
        example: 'Nenhum usuário logado, faça o login'
    }
}
#swagger.responses[404] = {
    description: 'Artista não encontrado.',
    schema: {
        type: 'string',
        example: 'Artista não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao atualizar o artista.',
    schema: {
        type: 'string',
        example: 'Erro ao atualizar o artista -> erro'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    const {id} = req.params
    try{
        const artista = await Artista.findByPk(id)
        if(!artista)
            return res.status(404).send('Artista não existe')

        await artista.update(req.body)
        res.status(200).json(artista)
    } catch(error) {
        res.status(500).send('Erro ao atualizar o artista -> '+error)
    }
}

//Função que apaga o artista
exports.deleteArtista = async(req, res) => {
/*
#swagger.tags = ['Artistas']
#swagger.summary = 'Deleta um artista'
#swagger.description = 'Endpoint para deletar um artista do sistema com base no ID.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID do artista a ser deletado.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Artista deletado com sucesso.',
    schema: {
        type: 'string',
        example: 'Artista apagado'
    }
}
#swagger.responses[403] = {
    description: 'Usuário não logado.',
    schema: {
        type: 'string',
        example: 'Nenhum usuário logado, faça o login'
    }
}
#swagger.responses[404] = {
    description: 'Artista não encontrado.',
    schema: {
        type: 'string',
        example: 'Artista não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao deletar o artista.',
    schema: {
        type: 'string',
        example: 'Artista não pôde ser apagado -> erro'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    const {id} = req.params
    try {
        const artista = await Artista.findByPk(id)
        if(!artista)
            return res.status(404).send('Artista não existe')

        await artista.destroy()
        res.status(200).send('Artista apagado')
    }catch(error){
        res.status(500).send('Artista não pôde ser apagado -> '+error)
    }
}