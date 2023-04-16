const express = require('express')
const connection = require('./src/database')
const Place = require('./src/models/place')

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

app.listen (8888, () => {  //subi em porta diferente para não dar conflito//
    console.log ("Servidor online")
})