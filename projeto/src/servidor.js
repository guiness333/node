const porta = 3003

const express = require('express')
const app = express()

var Web3 = require('web3')

Web3 = new Web3("http://localhost:7545");
        Web3.eth.getAccounts().then(function(result){
        Web3.eth.defaultAccount = result[0];
        });


        var contract = new Web3.eth.Contract([{
            "constant": false,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "nome",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "partido",
                    "type": "string"
                },
                {
                    "internalType": "uint16",
                    "name": "digito",
                    "type": "uint16"
                }
            ],
            "name": "addCandidato",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "nome",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint16",
                    "name": "digito",
                    "type": "uint16"
                }
            ],
            "name": "eAddCandidato",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint16",
                    "name": "digito",
                    "type": "uint16"
                }
            ],
            "name": "get",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "nome",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "partido",
                            "type": "string"
                        },
                        {
                            "internalType": "uint16",
                            "name": "digito",
                            "type": "uint16"
                        }
                    ],
                    "internalType": "struct votacao.candidato",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ],'0xC007947d21D968B036c1f4b7666bAeE018051246',{from: '0xE78450Ba2399402287450f1C387Ade71F9cB8a9E',gasPrice: '20000000000'});
        

app.get('/candidatos', (req, res, next)=>{
    try{
    contract.methods.get(parseInt(req.query.candidato)).call().then(a=>res.send(a))
    }catch(e){
        console.log(res.send('Parametros inválidos'))
    }
})
app.post('/addcandidatos', (req, res, next)=>{
    try{
        //console.log(req.query.nome, req.query.partido, parseInt(req.query.digito))
        contract.methods.addCandidato(req.query.nome, req.query.partido, parseInt(req.query.digito)).send({gas: 2000000}).then(a=>res.send(a))
    }catch(e){
        console.log(e)
    }
})
app.listen(porta,()=>{
    console.log(`Servidor executando na porta ${porta}.`)
})