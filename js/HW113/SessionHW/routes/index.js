var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/') 
  .get(function(req, res, next) {
    res.render('index', { title: 'Session HW App', subtitle: 'Login'});
  })
  .post(function (req,res,next) {
    req.session.name = req.body.name;
    req.session.site_visits = 0;
    return res.redirect('/admin')
  });
//dont need a sign in for this homework... have the login page, have the server set the sessions info, and display on a seperate page that gets loaded
//have the number of visits when you create the session be set to 0, and on each reload, you ++
//wont save the number, cuz im NOT doing the sql stuff now...ich vill nisht
//upon logout, reroute to the login page

//question: can i use session anywhere if it is initialized in app.js? i guess i have to try...
module.exports = router;
