const express = require('express')
const connection = require('./src/database')
const Place = require('./src/models/place')

const app = express()

connection.authenticate()
connection.sync({alter: true})

app.listen (8888, () => {  //subi em porta diferente para não dar conflito//
    console.log ("Servidor online")
})