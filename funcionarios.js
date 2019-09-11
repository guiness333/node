//Desafio achar o menor salario de uma chinesa

const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json'
const axios = require('axios')
const china  =  (data) => data.pais     == 'China'
const mulher =  (data) => data.genero   == 'F'
const menorSal = (anterior, proximo) =>{
    return anterior.salario > proximo.salario ? proximo : anterior
}
axios.get(url).then(response => {
    const funcionarios = response.data
    const chinesas = funcionarios.filter(china).filter(mulher).reduce(menorSal)
    console.log(chinesas)
})

