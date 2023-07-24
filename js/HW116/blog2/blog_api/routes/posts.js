import express from 'express';
const router = express.Router();
import {posts} from '../mongo.js';
import authMiddleware from '../authOnlyMiddleware.js';

router.route('/')
    .get(async (req, res, next) => {
        const thePosts = await posts.find().toArray();
        res.send(thePosts);
    })
    .post(authMiddleware, async (req, res, next) => {
        //change to req.session._____ (name? username?)
        req.body.author = req.session.username;

        console.log(req.session);
        console.log(req.body);

        req.body.date = new Date();
        const result = await posts.insertOne(req.body);
        console.log(result);
        if (!result.insertedId) {
          return next('oops, couldnt insert post');
        }
    
        //not sure why the req.body.id is set...
        req.body.id = result.insertedId;
        res.status(201)
          //.location(...)
          .send(req.body);
    });

export default router;