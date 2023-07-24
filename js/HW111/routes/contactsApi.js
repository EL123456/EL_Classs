var express = require('express');
const pool = require('../pool');
var router = express.Router();

router.route('/')
    .get(function (req,res,next) {
        pool.query(
            'SELECT * FROM contacts',
            (err,results,fields) => {
                if(err) {
                    res.statusCode = 500;
                    return res.end('Unable to load contacts');
                }
                res.send(results);
            }
        );
    })
    .post(function (req,res,next) {
        pool.query(
            'INSERT INTO contacts(first,last,email,phone) VALUES (?,?,?,?)', 
            [req.body.first, req.body.last, req.body.email, req.body.phone],
            (err,results,fields) => {
                console.log(results);
                if(err) {
                    res.statusCode = 500;
                    return res.send('Unable to add contact');
                }
                req.body.id = results.insertId;

                res.status(201)
                    .location(`/${req.body.id}`)
                    .send(req.body);
            }
        );
    })

router.route('/:id')
    .get(function (req,res,next) {
        pool.query(
            'SELECT * FROM contacts WHERE id = ?',
            [req.params.id],
            (err,results,fields) => {
                if(err) {
                    res.statusCode = 500;
                    return res.end('Unable to load contact');
                }

                if(!results.length) {
                    res.statusCode = 404;
                    return res.end('No such contact')
                }
                
                res.send(results[0]);
            }
        )
    });

module.exports = router;