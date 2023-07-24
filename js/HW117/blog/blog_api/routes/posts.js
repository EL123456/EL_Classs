import express from 'express';
const router = express.Router();
import sessionOnlyMiddleware from '../sessionOnlyMiddleware.js';
import { posts } from '../mongo.js';
import Mongo from 'mongodb';

export default function (socketIo) {
  router.route('/')
    .get(async (req, res, next) => {
      const thePosts = await posts.find().toArray();
      res.send(thePosts);
    })
    .post(sessionOnlyMiddleware, async (req, res, next) => {
      // Should validate post here. Maybe joi??
      req.body.author = req.session.username;
      req.body.date = new Date();
      const result = await posts.insertOne(req.body);
      console.log(result);

      if (!result.insertedId) {
        return next(new Error('oops, couldnt insert post'));
      }

      req.body.id = result.insertedId;

      socketIo.emit('post', req.body);

      res.status(201)
        //.location(...)
        .send(req.body);
    });

  router.route('/:id/comments')
    .post(sessionOnlyMiddleware, async function (req,res,next) {
      req.body.author = req.session.username;
      req.body.date = new Date();
      //this might just replace everything in the comment array
      const theId = new Mongo.ObjectId(req.params.id);
      const new_comment = await posts.updateOne({_id: theId},{$push: {comments: req.body}});

      console.log(new_comment);

      if(new_comment.modifiedCount === 0) {
        const err = new Error("couldn't find the post you where looking for");
        err.statusCode = 404;
        return next(err);
      }

      req.body.postId = req.params.id;

      socketIo.emit('comment', req.body);

      res.status(201)
        //.location(...)
        .send(req.body);
    });

  return router;
};
