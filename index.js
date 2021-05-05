const express = require ('express') // Carrega o express
require ('dotenv').config() // Carrega as variaveis de ambiente
const InicializaMongoServer = require('./Config/Db')

//Rotas do nosso projeto backend
const rotasCategoria = require('./routes/Categoria')

//Inicialização do servidor MongoDB
InicializaMongoServer()

const app = express()
app.disable('x-powered-by')// Remove o Powered by Express
//Porta default do servidor web
const PORT = process.env.PORT

app.use(express.json()) //Iremos fazer o parse do JSON - verificar se é valiso

app.get('/', (req, res)=>{
    res.json({mensagem: 'API 100% Funcional', versão: '1.0.0'})
})

/* Rotas ligadas ao MongoDb */
app.use('/categorias', rotasCategoria)

//Rota para tratar erros 404
app.use(function(req, res){
    res.status(404).json({mensagem:`A rota${req.originalUrl} informada não existe` })
})

app.listen(PORT, (req, res) => {
    console.log(`Servidor Web rodando na porta ${PORT}`)
})