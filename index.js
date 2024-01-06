const express = require('express');
require('./Config/Database');

const app = express();
const PORT = process.env.PORT ||  3500;

app.get('/', ( req, res ) =>{
    res.send('¡Hola mundo!')
});

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});


