var express = require('express');
var router = express.Router();
var mongoUtil = require('../database');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express',error: req.query.error == 1 ? 1 : 0, success: req.query.success == 1 ? 1 : 0});
});

router.post('/login',function(req,res) {
  var db = mongoUtil.getDb();
  if(req.session.user){
    res.render('dashboard')
  }

  var hash = crypto.createHash('sha1');
  shapass = hash.update(req.body.pass, 'utf-8').digest('hex')
  console.log(shapass);
  db.collection("users").find({email: req.body.email, pass: shapass}).toArray().then((result) => {
    if(result.length > 0) {
      req.session.user = result[0]
      res.redirect('/dashboard');
    } else {
      res.redirect('/?error=1')
    }
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
});

router.get('/signup',function(req,res) {
  res.render('signup',{email: req.query.email == 1 ? 1 :0})
});

router.post('/create_account',function(req, res)  {
  var db = mongoUtil.getDb();

  var hash = crypto.createHash('sha1');
  shapass = hash.update(req.body.pass, 'utf-8').digest('hex')
  
  db.collection("users").find({email: req.body.email, pass: shapass}).toArray().then((selectUser) => {
    if(selectUser.length > 0) {
        res.redirect('/signup'+'?email=1')
    }else {
      db.collection("users").insertOne({
        name: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        pass: shapass
      }).then((createUser) => {
        res.redirect('/');
      }).catch((error) => {
        res.status(500).send({error: error.message});
    });
    }
  })
});

router.get('/dashboard',function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  }
  res.render('live-chat',{'user' : req.session.user})
});

router.get('/chat',function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
  }
  res.render('chat',{'user' : req.session.user})
});

router.get('/logout',function(req, res) {
  if (req.session.user) {
    res.redirect('/')
  }
});

router.get('/angular-demo',function(req, res) {
  if (req.session.user) {
    res.render('angular-demo');
  }
});
module.exports = router;
