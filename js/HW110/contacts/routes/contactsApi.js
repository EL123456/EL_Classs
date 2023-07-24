var express = require('express');
var router = express.Router();

const contacts = [
    {id:1, first:'Ally',last: 'Shmally',email:'lalala@gmail.com',phone:'1234567890'},
    {id:2, first:'Billy',last:'Willy',email:'idontcare@gmail.com',phone:'0987654321'}
  ];

router.get('/contacts', function(req, res, next) {
    res.send(contacts)
});

module.exports = router;
