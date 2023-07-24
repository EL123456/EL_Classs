var express = require('express');
var router = express.Router();
const pool = require('../pool.js');

router.route('/')
    .get(function (req,res,next) {
        pool.query(
            'SELECT id,name FROM recipes',
            (err,results,fields) => {
                if(err) {
                    res.statusCode = 500;
                    return res.end('unable to get the recipes');
                }

                res.send(results);
            }
        );
    })
    .post(function (req,res,next) {
        pool.query(
            'INSERT INTO recipes(name,picture,ingredients) VALUES (?,?,?)',
            [req.body.name,req.body.picture,req.body.ingredients],
            (err,results,fields) => {

                if (err) {
                    res.statusCode =  500;
                    return res.end('was not able to insert recipe');
                }

                let id = results.insertId;

                res.status(201)
                    .location(`${req.baseUrl}/${id}`)
                    .send(`recipe added`);
            }
        );
    });


//maybe put this in its own route?
router.route('/:id')
    .get(function (req,res,next) {
        pool.query(
            'SELECT name,picture,ingredients FROM recipes WHERE id = ?',
            [req.params.id],
            (err,results,fields) => {
                if(err) {
                    res.statusCode = 500;
                    return res.end(`was unable to retrieve recipe ${req.params.id}`);
                }

                if(!results.length) {
                    res.statusCode = 404;
                    return res.end(`could not find recipe ${req.params.id}. Are you sure it exists?`)
                }

                results = results.map(recipe => ((recipe.ingredients = JSON.parse(recipe.ingredients)),recipe));

                res.send(results[0]);
            }
        )
    })
    .put(function (req,res,next) {
        pool.query(
            'UPDATE recipes SET name = ?, picture = ?, ingredients = ? WHERE id = ?',
            [req.body.name,req.body.picture,req.body.ingredients,req.params.id],
            (err,results,fields) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end(`was unable to update recipe ${req.params.id}`);
                }

                if(!results.affectedRows) {
                    res.statusCode = 404;
                    return res.end(`did not find recipe ${req.params.id}. Are you sure it exists?`);
                }

                if(!results.changedRows) {
                    return res.sendStatus(304);
                }

                res.sendStatus(204);
            }
        );
    })
    .delete(function (req,res,next) {
        pool.query(
            'DELETE FROM recipes WHERE id = ?',
            [req.params.id],
            (err,results,fields) => {

                if(err) {
                    res.statusCode = 500;
                    return res.end(`was unable to delete recipe ${req.params.id}`)
                }

                if(!results.affectedRows) {
                    res.statusCode = 404;
                    return res.end(`did not find recipe ${req.params.id}. Are you sure it exists?`)
                }

                res.sendStatus(204)
            }
        );
    });

module.exports = router;