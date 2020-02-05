//Load express module
const express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    faker = require('faker');
    
    
app.use(bodyParser.json());

//Define request response in root URL (/)
app.get('/', (req, res)=> {
  res.send('Sucess!');
})

// Create a basic get API with some response...
app.get('/post-list', (req,res)=>{
    if(!req.query.user_id || req.query.user_id==""){
        res.status(401).send({"message":"Falta parâmetros"})
    }
    else{
        res.json({
            "userId": 1,
            "id": 1,
            "title": "Maria aqui está",
            "body": "Maria minha amada!!!"
        })
    }
    
})

// Dummy post API with some input params and response.
app.post('/submit-data', (req,res)=>{
    if(!req.body.name || !req.body.email){
        res.status(401).json({
            message : "Não encontrado!"
        })
    }
    else{
        res.status(200).json({
            message : "Data salva com sucesso!"
        })
    }
})


app.listen(4000, ()=> {
  console.log('App rodando na porta 400!')
})


module.exports = app;