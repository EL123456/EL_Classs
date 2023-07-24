var express = require('express');
var router = express.Router();
const pool = require('../pool');
const { Socket } = require('socket.io');

module.exports = function (socketIo) {
    router.route('/')
        .get(function(req,res,next) {
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
        .post(function(req, res, next) {
            pool.query(
            'INSERT INTO contacts(first,last,email,phone) VALUES (?,?,?,?)', [req.body.first,req.body.last,req.body.email,req.body.phone],
            (err,results,fields) => {
                if(err) {
                res.statusCode = 500;
                return res.end('Unable to add contact')
                }
                req.body.id = results.insertId;

                socketIo.emit('add',req.body);
                
                //res.sendStatus(201);
                res.status(201)
                    .location(`${req.baseUrl}/${req.body.id}`)
                    .send(req.body);
            });
        });

    router.route('/:id')
        .get(function(req,res,next) {
            pool.query(
                'SELECT * FROM contacts WHERE id = ?', [req.params.id],
                (err,results,fields) => {
                    if(err) {
                        res.statusCode = 500;
                        return res.end(`Unable to get contact ${req.params.id}`)
                    }
                    if(!results.length) {
                        res.statusCode = 404;
                        return res.end(`no such contact`)
                    }
                    res.send(results[0]);
                }
            );
        })
        .put(function(req,res,next) {
            pool.query(
                'UPDATE contacts SET first=?, last = ?, email = ?, phone = ? WHERE id = ?', [req.body.first,req.body.last,req.body.email,req.body.phone,req.params.id],
                (err,results,fields) => {
                    if(err) {
                        res.statusCode = 500;
                        return res.end(`Unable to update contact`);
                    }
                    if(!results.affectedRows) {
                        res.statusCode = 404;
                        return res.end(`No such contact - ${req.params.id}`);
                    }
                    if(!results.changedRows) {
                        res.statusCode = 304;
                        return res.end(`No update performed - ${req.params.id}`);
                    }

                    req.body.id = req.params.id;

                    socketIo.emit('update', req.body);

                    res.sendStatus(204);
                }
            );
        })
        .delete(function(req,res,next) {
            pool.query(
                'DELETE FROM contacts WHERE id = ?', [req.params.id],
                (err,results,fields) => {
                    if(err) {
                        res.statusCode = 500;
                        return res.end(`unable to delete contact`);
                    }
                    if(!results.affectedRows){
                        res.statusCode = 404;
                        return res.end(`No such contact - ${req.params.id}`);
                    }

                    socketIo.emit('delete', req.params.id);

                    res.sendStatus(204);
                }
            )
        });

    return router;
};
