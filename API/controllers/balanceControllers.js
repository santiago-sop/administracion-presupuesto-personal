const connection_db = require('../config/dbConfig.js')

const getBalances = (req,res)=>{
    connection_db.query('SELECT * FROM  t_balance ORDER BY `date` DESC', (err, results)=>{
        if(err) throw err;
        res.send(results)
    })
}

const getOperation = (req,res)=>{
    let {id} = req.params;
    connection_db.query('SELECT * FROM  t_balance WHERE id_balance = ?', [id], (err, results)=>{
        if(err) throw err;
        res.send(results)
    })
}

const addOperation = (req,res) => {
    //Destructuring
    let {concept,amount,date,kind} = req.body;
    console.log(req.body)
    connection_db.query('INSERT INTO t_balance (`concept`, `amount`, `date`, `kind`) VALUES (?,?,?,?)',[concept,amount,date,kind],(err, results)=>{
        if(err) throw err;
        res.send('Datos enviados con exito')
    })
}

const deleteOperation = (req,res) => {
    //Destructuring
    let {id} = req.params;
    console.log(req.body)
    connection_db.query('DELETE FROM `t_balance` WHERE id_balance = ?',[id],(err, results)=>{
        if(err) throw err;
        res.send('Datos eliminados con exito')
    })
}

const editOperation = (req,res) => {
    //Destructuring
    let {id} = req.params;
    let {concept,amount,date} = req.body;
    connection_db.query('UPDATE `t_balance` SET `concept`=?,`amount`=?,`date`=? WHERE id_balance=?',[concept,amount,date,id],(err, results)=>{
        if(err) throw err;
        res.send('Operacion editada con exito')
    })
}

module.exports = {
    getBalances,
    getOperation,
    addOperation,
    deleteOperation,
    editOperation
}