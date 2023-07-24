var express = require('express');
var router = express.Router();

//need to:
//track how many times a site has been visited (did the loading whatever thing) - YEP
//save an input to a cookie and then display on the page somewhere (gonna have the input disappear when you press submit) - 

//baruch hashem it seems to be working...
//i guess you cant do javascript when you initalize a value (cuz i tryed setting something to ____++... was just reading it as false or whatever)
router.get('/', function(req, res, next) {
  const siteCookie = req.signedCookies['site_info'] ? JSON.parse(req.signedCookies['site_info']) : {};

  const info = {
    name : req.query.name || siteCookie.name || '',
    site_visits : siteCookie.site_visits || 0
  }

  info.site_visits++;

  res.cookie('site_info', JSON.stringify(info), {httpOnly: true, secure: true, signed: true});
  
  res.render('inputForm', { title: 'Cookie HW Web App', site_visits : info.site_visits, name: info.name});
});

module.exports = router;
