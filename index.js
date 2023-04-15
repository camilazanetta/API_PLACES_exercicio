const express = require('express')

const app = express()

app.listen (8888, () => {  //subi em porta diferente para não dar conflito//
    console.log ("Servidor online")
})