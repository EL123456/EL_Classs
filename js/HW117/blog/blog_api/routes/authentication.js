import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs'
import { users } from '../mongo.js';

router.route('/register')
  .post((req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error('username and password are required'));
    }

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return next(err);
      }

      try {
        const result = await users.insertOne({ username: req.body.username, password: hash });
        console.log(result); // check for insert here?
      } catch (err) {
        console.log(err);
        if (err.code === 11000) {
          return next(new Error('that username is taken. Please try another.'));
        }
        return next(new Error('registration failed'));
      }

      res.sendStatus(201);
    });
  });

router.post('/login', async (req, res, next) => {
  const result = await users.findOne({ username: req.body.username });
  if (result) {
    const result2 = await bcrypt.compare(req.body.password, result.password);
    if (result2) {
      req.session.username = req.body.username;
      return res.sendStatus(200);
    }
  }
  const err = new Error('invalid username or password');
  err.statusCode = 401;
  return next(err);
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(200);
});

export default router;
