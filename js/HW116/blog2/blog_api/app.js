import express from 'express';
const app = express();
import session from 'express-session';
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';

/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/blog/posts',postsRouter);
app.use('/blog/auth/', authRouter);


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

app.listen(8080);
