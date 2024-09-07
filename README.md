# Projeto Backend - Sistema de Gestão Musical

Este projeto é um gerenciador de músicas, artistas, álbuns e usuários, desenvolvido utilizando Node.js, Express, Sequelize e Swagger para documentação da API.

## Funcionalidades

- **Artistas**: CRUD de artistas.
- **Álbuns**: CRUD de álbuns associados a artistas.
- **Músicas**: CRUD de músicas associadas a álbuns e artistas.
- **Usuários**: CRUD de usuários, com autenticação por JWT.
- **Documentação**: Geração automática de documentação com Swagger.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no backend.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para interação com o banco de dados PostgreSQL.
- **JWT (JSON Web Token)**: Para autenticação de rotas.
- **Swagger**: Para documentação automática da API.

## Instalação

1. **Instale as dependências:**
    ```
    npm install
    ```

2. **Configure as variáveis de ambiente:** edite o arquivo .env na raiz do projeto com as variáveis do seu sistema

3. **Execute a aplicação:**
    ```
    npm start
    ```
    
# Rotas Principais:

### Artistas

    POST /createArtista -> Cria um novo artista.
    GET /getArtistas? -> Lista todos os artistas dentro dos limites da paginação.
    GET /getArtista/:id -> Retorna um artista específico
    PUT /updateArtista/:id -> Atualiza os dados de um artista.
    DELETE /deleteArtista/:id -> Remove um artista.

### Álbuns

    POST /createAlbum -> Cria um novo álbum.
    GET /getAlbuns? -> Lista todos os álbuns dentro dos limites da paginação.
    GET /getAlbum/:id -> Retorna um álbum específico.
    GET /getAlbunsbyArtista/:nomeArtista? -> Retorna todos os álbuns de um determinado um determinado artista, dentro dos limites da paginação.
    PUT /updateAlbum/:id -> Atualiza os dados de um álbum.
    DELETE /deleteAlbuns/:id -> Remove um álbum.

### Músicas

    POST /createMusica -> Cria uma nova música.
    GET /getMusicas? -> Lista todas as músicas dentro do limite de paginação.
    GET /getMusica/:id -> Retorna uma música específica.
    GET /getMusicasByArtista/:nomeArtista? -> Retorna todas as músicas de um determinado artista, dentro dos limites da paginação.
    GET /getMusicasByAlbum/:nomeAlbum? -> Retorna todas as músicas de um determinado álbum dentro dos limites da paginação.
    PUT /updateMusica/:id -> Atualiza os dados de uma música.
    DELETE /deleteMusica/:id: Remove uma música.

### Usuários

    POST /registerUser -> Cria um novo usuário
    POST /registerUserAdmin -> Cria um novo usuário admin
    PUT /updateUser -> Atualiza o usuário logado
    PUT /updateUserAdmin/:id -> O usuário administrador logado pode editar outro usuário
    DELETE /deleteUser -> Apaga o usuário logado
    DELETE /deleteUserAdmin/:id -> O usuário administrador logado pode apagar outro usuário
    POST /login -> Realiza o login e retorna um token JWT.
    GET /acessos -> Exibe a quantidade de vezes que determinado usuário realizou login.

### Documentação

    GET /docs -> Exibe a documentação da API gerada pelo Swagger.

### Instalação
    GET /install -> Realiza a instalação do banco de dados com informações iniciais.

## Autenticação

As rotas protegidas requerem autenticação via token JWT. O token deve ser enviado no cabeçalho da requisição com a chave administrador.

## Documentação da API

A documentação da API é gerada automaticamente pelo Swagger. Após rodar o projeto, acesse /docs para visualizar a documentação.# Projeto Backend - Sistema de Gestão Musical