const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database/database');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*"); 
     next();
   });

router.get('/people', (req, res) => {
    mysqlConnection.query('SELECT fullname as fullName, birth, identification FROM people', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.delete('/people/:identification' , (req, res) => {
    mysqlConnection.query('DELETE FROM people WHERE identification = ?',[req.params.identification], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
        })
    });

router.post('/people', (req, res) => {
    const people = req.body;
    console.log(people);
    var sql = 'INSERT INTO people (fullname, identification, birth) VALUES (?,?,?)';
    mysqlConnection.query(sql, [people.fullName, people.identification, people.birth], (err, rows, fields) => {
        if (!err)
             res.end();
        else
           console.log(err);
        })
});

module.exports = router;