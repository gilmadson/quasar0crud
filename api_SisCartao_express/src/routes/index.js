const express = require('express')
const router = express.Router()
const sql = require('../config/dboperation')
let cartao = require('../model/cartao')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/posts', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  sql.getdataQuery().then((result) => {
    res.send(result[0])
  })
})

router.get('/posts/:id', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  sql.getdatabyId(req.params.id).then((result) => {
    res.send(result[0])
  })
})

router.post('/posts', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  console.log('iniciou a rota Addcartao')
  /* console.log(req.body) */
  try {
    console.log(JSON.stringify(req.body))
    cartao = { ...req.body }
    console.log(cartao)
    sql.addCartao(cartao).then(result => {
      console.log('promisse add cartão')
      res.status(201).send(result)
    })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/posts/:id', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  console.log('iniciou a rota delete')
  sql.apagarCartao(req.params.id).then((result) => {
    res.send(result[0])
    console.log('promisse delete ok')
  })
})

router.put('/posts/:id', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '1800')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  console.log('promisse Alteração')
  sql.alterarCartao(req.body, req.params.id).then((result) => {
    res.send(result[0])
    console.log('promisse Alteração ok')
  })
})

module.exports = router
