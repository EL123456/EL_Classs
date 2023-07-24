var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req, res, next) {
    req.session.site_visits++;
    res.render('admin', { title: 'Session HW App', subtitle: 'Admin', name: req.session.name, site_visits: req.session.site_visits})
  });

module.exports = router;
