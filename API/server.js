//Servidor
const express = require('express'); //Requerimos express
const app = express();      
const cors = require('cors');
const operationsRouter = require('./routes/operations')

app.use(cors())     //Permite varias consultas a la base de datos en simultaneo
app.use(express.json()) //Permite que mi app acepte json del lado del cliente
app.use(express.urlencoded({extended:true}))    //Permite la interpretacion de los datos que vienen del cliente
app.use('/manageroperations', operationsRouter);    //Agregamos las rutas creadas

//Escuchamos el puerto 8080
app.listen(8080, ()=>{
    console.log('Escuchando el puerto 8080')
})