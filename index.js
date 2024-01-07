const express = require('express');
require('./Config/Database');
const dotenv =require('dotenv');
const bodyParser = require('body-parser');
const HistorialMedicoRoute = require('./Routes/HistorialMedico');

dotenv.config();

const app = express();
const PORT = process.env.PORT ||  3500;
app.use(bodyParser.json());

app.use('/api', HistorialMedicoRoute);

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
