import express from 'express';
import http from 'http';
import {Server as io} from 'socket.io';
const app = express();
import session from 'express-session';
import cors from 'cors';

const server = http.createServer(app);
const socketIo = new io(server, {
  cors: 'http://localhost:3000'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri); */

/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

/* (async () => {
  await client.connect();
  global.posts = await client.db('blog').collection('posts');
  global.users = await client.db('blog').collection('users');
})(); */

app.use(session({
  secret: 'secret',
  /*cookie: {
    maxAge: 20000
  }*/
  resave: false,
  saveUninitialized: false
}));

import postRouter from './routes/posts.js';
import authRouter from './routes/authentication.js';

app.use('/posts', postRouter(socketIo));
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error('No such endpoint');
  error.statusCode = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500)
    .send(err.message);
});

server.listen(8080);