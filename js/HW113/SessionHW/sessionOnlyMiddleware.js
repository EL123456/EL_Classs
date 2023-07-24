module.exports = function sessionOnlyMiddleware(req, res, next) {
    if (req.session.name) {
      next();
    } else {
      res.redirect('/');
    }
};