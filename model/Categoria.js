const mongoose = require('mongoose')

// criando o esquema "schema" Categoria
//um atributo composto por outros atributos
// exclusão lógica não aparece mas esta no banco
const CategoriaSchema = mongoose.Schema({
    nome: {type:String},
    status: {type:String, enum:['ativo','inativo']},
    foto: {
          originalName: {type:String},
          path: {type:String},
          size: {type:Number},
          mimetype: {type:String}
    }
}, {timestamps: true})

module.exports = mongoose.model('categoria', CategoriaSchema)