const express = require('express');
const balanceControllers = require('../controllers/balanceControllers')
const operationsRouter = express.Router();

//Rutas
//Ruta para obtener todos los datos de la base de datos ordenados por fecha del mas actual al mas antiguo.
operationsRouter.get('/',balanceControllers.getBalances)

//Ruta para obtener una operacion especifica
operationsRouter.get('/operations/:id', balanceControllers.getOperation)

//Ruta para agregar una nueva operacion.
operationsRouter.post('/operations', balanceControllers.addOperation)

//Ruta para editar una operacion
operationsRouter.put('/operations/:id', balanceControllers.editOperation)

//Ruta para eliminar una operacion
operationsRouter.delete('/operations/:id', balanceControllers.deleteOperation)

module.exports = operationsRouter;