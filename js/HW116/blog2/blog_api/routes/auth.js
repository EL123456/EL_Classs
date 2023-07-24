import express from 'express';
const router = express.Router();
import { users } from '../mongo.js';
import bcrypt from 'bcryptjs';

router.route('/register')
    .post(function (req,res,next) {
        if(!req.body.username || !req.body.password){
            return next(new Error('please enter a username and password'));
        }

        bcrypt.hash(req.body.password, 10, async (err,hash) => {
            if (err) {
                return next(err);
            }

            try {
                const insert = await users.insertOne({
                    username: req.body.username,
                    password: hash
                });
                console.log(insert);
            } catch (err) {
                console.log(err);
                if(err.code === 11000) {
                    return next(new Error('Duplicate username'));
                }

                return next(new Error('registration failed'))
            }

            res.sendStatus(201);
        });

        
        ///for validation of both filled in, use required tag in the jsx/html
    });

router.route('/login')
    .post(async function (req,res,next) {
        const retrieve = await users.findOne({username: req.body.username});
        if(retrieve) {
            const check = await bcrypt.compare(req.body.password, retrieve.password);
            console.log(check);
            if(check) {
                req.session.username = req.body.username;
                console.log(req.session);
                return res.sendStatus(200);
            }
        }

        const err = new Error('invalid input');
        err.statusCode = 401;
        return next(err);
    });

router.route('/logout')
    .post(function (req,res,next) {
        req.session.destroy();
        res.sendStatus(200);
    });

export default router;