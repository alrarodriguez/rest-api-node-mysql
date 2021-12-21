const express = require('express');
const router = express.Router();

const mysqlConnection = require('../db/database');

router.get('/personas', (req, res) => {
    mysqlConnection.query('SELECT * FROM persona', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.delete('/personas/:id' , (req, res) => {
    mysqlConnection.query('DELETE FROM persona WHERE id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
        })
    });

router.post('/personas', (req, res) => {
    const persona = req.body;
    var sql = 'INSERT INTO persona (nombres, apellidos, identificacion, edad, birth) VALUES (?,?,?,?,?)';
    mysqlConnection.query(sql, [persona.nombres, persona.apellidos, persona.identificacion, persona.edad, persona.birth], (err, rows, fields) => {
        if (!err)
             res.send('Persona insertada con Id: ' + rows.insertId);
        else
           console.log(err);
        })
});

module.exports = router;