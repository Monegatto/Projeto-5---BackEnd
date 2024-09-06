const Musica = require('../model/Musica')
const Album = require('../model/Album')
const Artista = require('../model/Artista')

//Função que armazena uma nova música no sistema, requer que ambos o artista e álbum já estejam presentes
exports.createMusica = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Cria uma nova música'
#swagger.description = 'Endpoint para criar uma nova música no sistema. Requer que o artista e o álbum já estejam presentes.'
#swagger.parameters['Musica'] = {
    in: 'body',
    description: 'Dados da música a ser criada.',
    schema: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Never Ending Moment' },
            artista: { type: 'string', example: 'Des Rocs' },
            album: { type: 'string', example: 'Dream Machine' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Música criada com sucesso.',
    schema: {
        type: 'string',
        example: 'Música Never Ending Moment armazenada com sucesso'
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
    description: 'Artista ou álbum não encontrado.',
    schema: {
        type: 'string',
        example: 'Des Rocs não existe no sistema' || 'Dream Machine não existe no sistema'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao criar a música.',
    schema: {
        type: 'string',
        example: 'Erro ao armazenar a musica -> erro'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    try{
        const {nome, artista, album} = req.body

        const artistaExiste = await Artista.findOne({where: {nome: artista}})
        if(!artistaExiste)
            return res.status(404).send(artista+' não existe no sistema')
        
        const albumExiste = await Album.findOne({where: {nome: album}})
        if(!albumExiste)
            return res.status(404).send(album+' não existe no sistema')

        const {id_artista} = artistaExiste
        const {id_album} = albumExiste

        const musica = await Musica.create({nome, artista, album, id_artista, id_album})
        res.status(200).send('Musica '+musica.nome+' armazenada com sucesso')
    }catch(error){
        res.status(500).send('Erro ao armazenar a musica -> '+error)
    }
}

//Função que retorna todas as músicas no sistema
exports.getMusicas = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Retorna todas as músicas'
#swagger.description = 'Endpoint para retornar todas as músicas no sistema com paginação.'
#swagger.parameters['limite'] = { 
    in: 'query',
    description: 'Número máximo de músicas a serem retornadas.',
    schema: { type: 'integer', example: 15 }
}
#swagger.parameters['pagina'] = { 
    in: 'query',
    description: 'Número da página para a paginação.',
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Lista de músicas retornada com sucesso.',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Never Ending Moment' },
                artista: { type: 'string', example: 'Des Rocs' },
                album: { type: 'string', example: 'Dream Machine' }
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
    description: 'Erro ao buscar as músicas.',
    schema: {
        type: 'string',
        example: 'Erro ao buscar as músicas -> erro'
    }
}
*/
    try{
        const {limite, pagina} = req.params

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina)
        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0)){
            res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')
        }

        const musicas = await Musica.findAll({limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(musicas)
    }catch(error){
        res.status(500).send('Erro ao buscar as músicas -> '+error)
    }
}

//Função que retorna uma música específica
exports.getMusica = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Retorna uma música específica'
#swagger.description = 'Endpoint para retornar uma música específica com base no ID.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID da música a ser retornada.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Música retornada com sucesso.',
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Never Ending Moment' },
            artista: { type: 'string', example: 'Des Rocs' },
            album: { type: 'string', example: 'Dream Machine' }
        }
    }
}
#swagger.responses[404] = {
    description: 'Música não encontrada.',
    schema: {
        type: 'string',
        example: 'Música não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao encontrar a música.',
    schema: {
        type: 'string',
        example: 'Erro ao encontrar música de id 1 com erro erro'
    }
}
*/
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(404).send('Musica não existe')

        res.status(200).json(musica)
    }catch(error){
        res.status(500).send('Erro ao encontrar musica de id '+id+' com erro +error')
    }
}

//Função que retorna todas musicas de um artista específico
exports.getMusicasByArtista = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Retorna todas as músicas de um artista específico'
#swagger.description = 'Endpoint para retornar todas as músicas de um artista específico com base no nome do artista e com paginação.'
#swagger.parameters['limite'] = { 
    in: 'query',
    description: 'Número máximo de músicas a serem retornadas.',
    schema: { type: 'integer', example: 15 }
}
#swagger.parameters['pagina'] = { 
    in: 'query',
    description: 'Número da página para a paginação.',
    schema: { type: 'integer', example: 1 }
}
#swagger.parameters['nomeArtista'] = { 
    in: 'query',
    description: 'Nome do artista para filtrar as músicas.',
    schema: { type: 'string', example: 'Des Rocs' }
}
#swagger.responses[200] = {
    description: 'Lista de músicas do artista retornada com sucesso.',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Never Ending Moment' },
                artista: { type: 'string', example: 'Des Rocs' },
                album: { type: 'string', example: 'Dream Machine' }
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
    description: 'Erro ao encontrar as músicas do artista.',
    schema: {
        type: 'string',
        example: 'Erro ao encontrar a música do artista Des Rocs com erro erro'
    }
}
*/
    try{
        const {limite, pagina} = req.params
        const {nomeArtista} = req.query

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina)
        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const {id_artista} = await Artista.findOne({where: {nome: nomeArtista}})
        if(!id_artista)
            return res.status(404).send(nomeArtista+' não existe no sistema')

        const musicas = await Musica.findAll({where: {artista: nomeArtista}, limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(musicas)
    } catch(error){
        res.status(500).send('Erro ao encontrar a musica do artista '+nomeArtista+' com erro '+error)
    }
}

//Função que retorna todas as musicas de um album específico
exports.getMusicaByAlbum = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Retorna todas as músicas de um álbum específico'
#swagger.description = 'Endpoint para retornar todas as músicas de um álbum específico com base no nome do álbum e com paginação.'
#swagger.parameters['limite'] = { 
    in: 'query',
    description: 'Número máximo de músicas a serem retornadas.',
    schema: { type: 'integer', example: 15 }
}
#swagger.parameters['pagina'] = { 
    in: 'query',
    description: 'Número da página para a paginação.',
    schema: { type: 'integer', example: 1 }
}
#swagger.parameters['nomeAlbum'] = { 
    in: 'query',
    description: 'Nome do álbum para filtrar as músicas.',
    schema: { type: 'string', example: 'Dream Machine' }
}
#swagger.responses[200] = {
    description: 'Lista de músicas do álbum retornada com sucesso.',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Never Ending Moment' },
                artista: { type: 'string', example: 'Des Rocs' },
                album: { type: 'string', example: 'Dream Machine' }
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
    description: 'Álbum não encontrado.',
    schema: {
        type: 'string',
        example: 'Dream Machine não existe no sistema'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao encontrar as músicas do álbum.',
    schema: {
        type: 'string',
        example: 'Erro ao encontrar músicas do álbum Dream Machine com erro erro'
    }
}
*/
    try{
        const {limite, pagina} = req.params
        const {nomeAlbum} = req.query

        const limiteEntradas = parseInt(limite); const paginaInicial = parseInt(pagina)
        if(![5, 15, 30].includes(limiteEntradas || paginaInicial <= 0))
            return res.status(400).send('Erro, verifique se o limite de objetos é 5, 15 ou 30 e se a página informada é maior que 0')

        const {id_album} = await Album.findOne({where: {nome: nomeAlbum}})
        if(!id_album)
            return res.status(404).send(nomeAlbum+' não existe no sistema')

        const musicas = await Musica.findAll({where: {album: nomeAlbum},limit: limiteEntradas, offset: (paginaInicial - 1) * limiteEntradas})
        res.status(200).json(musicas)
    } catch(error){
        res.status(500).send('Erro ao encontrar musicas do album '+nomeAlbum+' com erro '+error)
    }
}

//Função que atualiza uma música
exports.updateMusica = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Atualiza uma música'
#swagger.description = 'Endpoint para atualizar as informações de uma música existente.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID da música a ser atualizada.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.parameters['Musica'] = {
    in: 'body',
    description: 'Dados atualizados da música.',
    schema: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Never Ending Moment' },
            artista: { type: 'string', example: 'Des Rocs' },
            album: { type: 'string', example: 'Dream Machine' }
        }
    }
}
#swagger.responses[200] = {
    description: 'Música atualizada com sucesso.',
    schema: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Never Ending Moment' },
            artista: { type: 'string', example: 'Des Rocs' },
            album: { type: 'string', example: 'Dream Machine' }
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
    description: 'Música não encontrada.',
    schema: {
        type: 'string',
        example: 'Música não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao atualizar a música.',
    schema: {
        type: 'string',
        example: 'Erro ao atualizar a música -> erro'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(404).json('Musica não existe')

        await musica.update(req.body)
        res.status(200).json(musica)
    }catch(error){
        res.attsu(500).josn('Erro ao atualizar a musica -> '+error)
    }
}

//Função que apaga uma musica
exports.deleteMusica = async (req, res) => {
/*
#swagger.tags = ['Músicas']
#swagger.summary = 'Remove uma música'
#swagger.description = 'Endpoint para remover uma música do sistema.'
#swagger.parameters['id'] = { 
    in: 'path',
    description: 'ID da música a ser removida.',
    required: true,
    schema: { type: 'integer', example: 1 }
}
#swagger.responses[200] = {
    description: 'Música removida com sucesso.',
    schema: {
        type: 'string',
        example: 'Música apagada'
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
    description: 'Música não encontrada.',
    schema: {
        type: 'string',
        example: 'Música não existe'
    }
}
#swagger.responses[500] = {
    description: 'Erro ao remover a música.',
    schema: {
        type: 'string',
        example: 'Música não pôde ser apagada'
    }
}
*/
    if(!req.user)
        return res.status(403).send('Nenhum usuário logado, faça o login')
    const {id} = req.params
    try{
        const musica = await Musica.findByPk(id)
        if(!musica)
            return res.status(404).send('Musica não existe')

        await musica.destroy()
        res.status(200).send('Musica apagada')
    }catch(error){
        res.status(500).send('Musica não pôde ser apagada')
    }
}