// Rotas na categoria REST
const express = require('express')
const router = express.Router()
const{check, validationResult} = require('express-validator')

const Categoria = require('../model/Categoria')

/**********************************
 * GET/ Categorias
 * Listar todas as categorias do DB
 **********************************/
router.get("/", async(req, res)=>{
    try {
        const categorias = await Categoria.find()
        res.json(categorias)
    } catch(e){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter as categorias: ${e.message}'}]
        })
    }
})

/**********************************
 * GET/ Categoria/:id
 * Listar a categoria do DB pelo id
 **********************************/
router.get('/:id', async(req, res)=>{
    try{
        const categoria = await Categoria.findById(req.params.id)
        res.json(categoria)
    } catch(e){
        res.status(500).send({
            erros: [{
                message:`Não foi possivel obter a categoria com o id ${req.params.id}`
            }]
        })
    }
})

/**********************************
 * DELETE/ Categorias/:id
 * Apaga a categoria do DB pelo id
 **********************************/
router.delete('/:id', async(req, res)=>{
    await Categoria.findByIdAndRemove(req.params.id)
    .then(categoria => {
        res.send(
            {message: `Categoria ${categoria.nome} removida com sucesso!`}
            )
    }).catch(e => {
        return res.status(500).send({
            errors: [{
                message: `Não foi possível apagar a categoria com o id ${req.params.id}`
            }]
        })
    })
})

/**********************************
 * POST/ Categorias
 * Inserir uma categoria no DB
 **********************************/

const validaCategoria =[
    check('nome', 'Nome da categoria é obrigatório').not().isEmpty(),
    check('status','Inform um status válido para a categoria').isIn(['ativo','inativo'])
]

router.post('/', validaCategoria, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try{
        let categoria = new Categoria(req.body)
        await categoria.save()
        res.send(categoria)
    }
    catch (e){
        return res.status(500).json({
            errors: [{message:`Erro ao salvar a categoria: ${e.message}`}]
        })
    }
})

/**********************************
 * PUT/ Categorias
 * Altera uma categoria no DB pelo id
 **********************************/
router.put('/', validaCategoria, async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Categoria.findByIdAndUpdate(req.body._id,{
        $set: dados
    },{new: true})
    .then(categoria => {
        res.send({message:`Categoria ${categoria.nome} alterada com sucesso!`})
    }).catch(err => {
        return res.status(500).send({
            errors: [{message:`Não foi possível alterar a categoria com o id ${req.body._id}`}]
        })
    })
})

module.exports = router