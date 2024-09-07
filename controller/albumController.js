const Album = require('../model/Album')
const Artista = require('../model/Artista')

//Função que armazena um novo álbum no sistema, requer que o artista já esteja presente
exports.createAlbum = async (req, res) => {
/*
#swagger.tags = ['Álbuns']
#swagger.summary = 'Cria um novo álbum'
#swagger.description = 'Endpoint para criar um novo álbum no sistema. Requer que o artista já esteja presente.'
#swagger.parameters['Album'] = {
    in: 'body',
    description: 'Dados do álbum a ser criado.',
    schema: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Dream Machine' },
            artista: { type: 'string', example: 'Des Rocs' },
            quantidade_musicas: { type: 'integer', example: 9 },
            ano_lancamento: { type: 'integer', example: 2023 }
        }
    }
}
#swagger.responses[200] = {
    description: 'Álbum criado com sucesso.',
    schema: {
        type: 'string',
        example: 'Álbum Dream Machine armazenado com sucesso'
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
        example: 'Des Rocs não existe no sistema'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao criar o álbum.',
    schema: {
        type: 'string',
        example: 'Erro ao armazenar o album -> erro'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    try{
        const {nome, artista, quantidade_musicas, ano_lancamento} = req.body

        const artistaExiste = await Artista.findOne({where: {nome: artista}})
        if(!artistaExiste)
            return res.status(404).send(artista+' não existe no sistema')

        const {id_artista} = artistaExiste
        const album = await Album.create({nome, artista, quantidade_musicas, ano_lancamento, id_artista})

        res.status(200).send('Album '+ album.nome +' armazenado com sucesso')

    }catch(error){
        res.status(500).send('Erro ao armazenar o album -> '+error)
    }
}

//Função que retorna todos os albuns no sistema
exports.getAlbuns = async(req, res) => {
/*
#swagger.tags = ['Álbuns']
#swagger.summary = 'Retorna todos os álbuns'
#swagger.description = 'Endpoint para retornar todos os álbuns no sistema com paginação.'
#swagger.parameters['limite'] = { 
    in: 'query',
    description: 'Número máximo de álbuns a serem retornados.',
    schema: { type: 'integer', example: 15 }
}
#swagger.parameters['pagina'] = { 
    in: 'query',
    description: 'Número da página para a paginação.',
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Lista de álbuns retornada com sucesso.',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Dream Machine' },
                artista: { type: 'string', example: 'Des Rocs' },
                quantidade_musicas: { type: 'integer', example: 9 },
                ano_lancamento: { type: 'integer', example: 2023 }
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
    description: 'Erro ao buscar os álbuns.',
    schema: {
        type: 'string',
        example: 'Erro ao buscar os albuns -> erro'
    }
}
*/
    try {
        const {limite, pagina} = req.query

        if(!limite || !pagina)
            return res.status(400).send("Verifique se você enviou ambos o limite de entradas (primeiro parâmetro) e a página inicial (segindo parâmetro) na URL")

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina)
        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const albuns = await Album.findAll({limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(albuns)
    } catch(error){
        res.status(500).send('Erro ao buscar os albuns -> '+error)
    }
}

//Função que retorna um álbum específico
exports.getAlbum = async (req, res) => {
/*
#swagger.tags = ['Álbuns']
#swagger.summary = 'Retorna um álbum específico'
#swagger.description = 'Endpoint para retornar um álbum específico com base no ID.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID do álbum a ser retornado.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Álbum retornado com sucesso.',
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Dream Machine' },
            artista: { type: 'string', example: 'Des Rocs' },
            quantidade_musicas: { type: 'integer', example: 9 },
            ano_lancamento: { type: 'integer', example: 2023 }
        }
    }
}
#swagger.responses[404] = {
    description: 'Álbum não encontrado.',
    schema: {
        type: 'string',
        example: 'Álbum não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao encontrar o álbum.',
    schema: {
        type: 'string',
        example: 'Erro ao encontrar album de id 1 com erro erro'
    }
}
*/
    const {id} = req.params
    try {
        const album = await Album.findByPk(id)
        if(!album)
            return res.status(404).send('Album não existe')

        res.status(200).json(album)
    } catch(error){
        res.status(500).send('Erro ao encontrar album de id '+id+' com erro '+error)
    }
}

//Função que retorna todos os albuns de um artista específico
exports.getAlbunsByArtista = async (req, res) => {
/*
#swagger.tags = ['Álbuns']
#swagger.summary = 'Retorna todos os álbuns de um artista específico'
#swagger.description = 'Endpoint para retornar todos os álbuns de um artista específico com base no nome do artista e com paginação.'
#swagger.parameters['limite'] = { 
    in: 'query',
    description: 'Número máximo de álbuns a serem retornados.',
    schema: { type: 'integer', example: 15 }
}
#swagger.parameters['pagina'] = { 
    in: 'query',
    description: 'Número da página para a paginação.',
    schema: { type: 'integer', example: 1 }
}
#swagger.parameters['nomeArtista'] = { 
    in: 'query',
    description: 'Nome do artista para filtrar os álbuns.',
    schema: { type: 'string', example: 'Des Rocs' }
}
#swagger.responses[200] = {
    description: 'Lista de álbuns do artista retornada com sucesso.',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Dream Machine' },
                artista: { type: 'string', example: 'Des Rocs' },
                quantidade_musicas: { type: 'integer', example: 9 },
                ano_lancamento: { type: 'integer', example: 2023 }
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
#swagger.responses[404] = {
    description: 'Artista não encontrado.',
    schema: {
        type: 'string',
        example: 'Des Rocs não existe no sistema'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao encontrar os álbuns do artista.',
    schema: {
        type: 'string',
        example: 'Erro ao encontrar album do artista Des Rocs com erro erro'
    }
}
*/
    try{
        const {limite, pagina} = req.query
        const {nomeArtista} = req.params

        if(!limite || !pagina)
            return res.status(400).send("Verifique se você enviou ambos o limite de entradas (primeiro parâmetro) e a página inicial (segindo parâmetro) na URL")

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina)
        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const {id_artista} = await Artista.findOne({where: {nome: nomeArtista}})
        if(!id_artista)
            return res.status(404).send(nomeArtista+' não existe no sistema')

        const albuns = await Album.findAll({where: {artista: nomeArtista}, limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(albuns)
    } catch(error){
        res.status(500).send('Erro ao encontrar album do artista '+nomeArtista+' com erro '+error)
    }
}

//Função que atualiza um álbum
exports.updateAlbum = async(req, res) => {
/*
#swagger.tags = ['Álbuns']
#swagger.summary = 'Atualiza um álbum'
#swagger.description = 'Endpoint para atualizar as informações de um álbum existente.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID do álbum a ser atualizado.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.parameters['Album'] = {
    in: 'body',
    description: 'Dados do álbum a serem atualizados.',
    schema: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Dream Machine' },
            artista: { type: 'string', example: 'Des Rocs' },
            quantidade_musicas: { type: 'integer', example: 9 },
            ano_lancamento: { type: 'integer', example: 2023 }
        }
    }
}
#swagger.responses[200] = {
    description: 'Álbum atualizado com sucesso.',
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Dream Machine' },
            artista: { type: 'string', example: 'Des Rocs' },
            quantidade_musicas: { type: 'integer', example: 9 },
            ano_lancamento: { type: 'integer', example: 2023 }
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
    description: 'Álbum não encontrado.',
    schema: {
        type: 'string',
        example: 'Álbum não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao atualizar o álbum.',
    schema: {
        type: 'string',
        example: 'Erro ao atualizar o álbum -> erro'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    const {id} = req.params
    try{
        const album = await Album.findByPk(id)

        if(!album)
            return res.status(404).send('Album não existe')

        await album.update(req.body)
        res.status(200).json(album)
    } catch(error) {
        res.status(500).send('Erro ao atualizar o álbum -> '+error)
    }
}

//Função que apaga um álbum
exports.deleteAlbum = async(req, res) => {
/*
#swagger.tags = ['Álbuns']
#swagger.summary = 'Remove um álbum'
#swagger.description = 'Endpoint para remover um álbum do sistema.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID do álbum a ser removido.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Álbum removido com sucesso.',
    schema: {
        type: 'string',
        example: 'Álbum apagado'
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
    description: 'Álbum não encontrado.',
    schema: {
        type: 'string',
        example: 'Álbum não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao remover o álbum.',
    schema: {
        type: 'string',
        example: 'Álbum não pôde ser apagado'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    const {id} = req.params
    try{
        const album = await Album.findByPk(id)
        if(!album)
            return res.status(404).send('Album não existe')
        
        await album.destroy()
        res.status(200).send('Album apagado')
    } catch(error){
        res.status(500).send('Album não pôde ser apagado')
    }
}