const express = require('express')
const connection = require('./src/database')

const Place = require('./src/models/place')
const User = require('./src/models/user') // após criar user.js e exportar, venho aqui e add esta linha, importando // após, no BD aparece "user" e colunas criadas //

const app = express()

app.use(express.json()) // obrigatório! //

connection.authenticate()
connection.sync({alter: true})

app.post('/places', async (request, response) => {
    try {
        const data = {
            name: request.body.name,
            contact: request.body.contact,
            opening_hours: request.body.opening_hours,
            description: request.body.description,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
        }

        const place = await Place.create (data)

        response.status(201).json(place)

    } catch (error) {
        response.status(500).json({message: 'Não foi possível concluir a operação'})
    }
})

app.get('/places', async (request, response) => {

    try{
        const places = await Place.findAll()
        return response.json(places)
    } catch (error) {
        response.status(500).json({message: 'Não conseguimos processar esta operação'})
    }

})

app.delete('/places/:id', async (request, response) => {
    try {
        await Place.destroy({
            where: {
                id: request.params.id
            }
        })
        response.status(200).json({message: 'deletado com sucesso'})
    } catch (error) {
        response.status(500).json ({message: 'Não foi possível processar a operação'})
    }
})

app.put('/places/:id', async (request, response) => { // em 1 async posso ter vários "await" //
    console.log(request.params.id)
    console.log(request.body)

    try {
        const placeInDataBase = await Place.findByPk (request.params.id)

        if (!placeInDataBase) {
            return response.status(404).json({message: "Instituição não encontrada"})
        }

        placeInDataBase.name = request.body.name // como se eu dissesse ao "lugar" que está no BD: seu nome, a partir de agora, será o que recebi no body da requisição //
        placeInDataBase.contact = request.body.contact
        placeInDataBase.opening_hours = request.body.opening_hours
        placeInDataBase.description = request.body.description
        placeInDataBase.latitude = request.body.latitude
        placeInDataBase.longitude = request.body.longitude

        await placeInDataBase.save() // final do processo, como se fosse um "ok" para atualizar os dados; equivalente ao UPDATE no sql // 

        response.json(placeInDataBase)

    } catch (error) {
        response.status(500).json ({message: "Não foi possível atualizar os dados"})
    }

})

app.post('/users', async (request, response) => {
    try {
        const newUser = {
            name: request.body.name,
            email: request.body.email,
            username: request.body.username,
            password: request.body.password
        }

        const user = await User.create (newUser) // pra criar novo usuário, assim como outras vezes, tbm uso variável que faz conexão com a tabela do BD - linha 5 //

        response.status(201).json(user)

    } catch (error) {
        response.status(500).json({message: 'Não foi possível cadastrar o usuário'})
    }

})


app.listen (8888, () => {  //subi em porta diferente para não dar conflito//
    console.log ("Servidor online")
})