const Sequelize = require("sequelize")
const dotenv = require("dotenv")

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, //Conectando com o banco de dados
{host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: 'postgres'})                   //passando parâmetros separadamente

sequelize.authenticate()                                //Testando a conexão
.then(()=> console.log("Conectado ao banco de dados"))  //Exibir no console a conexão com o banco de dados
.catch(error => console.log(error))                     //Mensagem de erro, caso tenha alguma

module.exports = sequelize