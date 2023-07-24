var express = require('express');
var router = express.Router();

let contacts = [
  {id:1, first:'Ally',last: 'Shmally',email:'lalala@gmail.com',phone:'1234567890'},
  {id:2, first:'Billy',last:'Willy',email:'idontcare@gmail.com',phone:'0987654321'}
];

let nextId = contacts.length + 1;

router.get('/', function(req, res, next) {
  res.render('contacts', {
    title: 'Contacts',
    contacts: contacts
  })
});

router.route('/addContact')
  .get(function (req,res,next) {
    res.render('addContact', {
          title: 'Add Contact'
      })
  })
  .post((req,res,next)=> {
      req.body.id = nextId++;
        contacts.push(req.body)
        res.redirect(301,'/contacts')
        res.end();
  });

router.route('/editContact/:id')
  .get(function (req,res,next) {
    res.render('addContact', {
      title: 'Edit Contact',
      contact: contacts.filter(c => c.id === +req.params.id)[0]
    });
  })
  .post(function (req,res,next) {
    let index = contacts.findIndex(c => c.id === +req.params.id)
    contacts[index] = req.body;
    res.redirect(301,'/contacts');
    res.end();
  });

router.get('/deleteContact/:id',function (req,res,next) {
  contacts = contacts.filter(c => c.id !== +req.params.id);
  res.redirect(301,'/contacts');
  res.end();
});



module.exports = router;
