var express = require('express');
var router = express.Router();  
var DB = require('../database');
var crypto = require('crypto');
session = require('express-session');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' ,error : req.query.error == 1 ? 1 : 0 ,success : req.query.success == 1 ? 1 : 0 });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' ,email: req.query.email == 1 ? 1 : 0 });
});

router.post('/login', function(req, res, next) {

  var hash = crypto.createHash('sha1');
  shapass = hash.update(req.body.pass, 'utf-8').digest('hex');
  console.log(shapass);
  var projectsSql = 'select * from user where email_id = ? and password = ?';
  DB.query(projectsSql, [req.body.email,shapass], function(err, users) { 
      if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
      }

      if (users.length > 0) {
        req.session.user = users[0];
        res.redirect('/dashboard')
      }else {
        res.redirect('/?error=1')
      }   
    });
})

router.get('/dashboard', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/')
  }else {
   /// next()
  }
  console.log(req.session.user.id);
  res.render('dashboard',{'user' : req.session.user});
});

router.post('/create_account',function (req, res) {

  var hash = crypto.createHash('sha1');
  shapass = hash.update(req.body.password, 'utf-8').digest('hex');
  console.log(shapass);

  var selectSql = 'select * from user where email_id = ? ';
  DB.query(selectSql, [req.body.email], function(err, selectUser) { 
      if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
      }
      if (selectUser.length > 0) {
        res.redirect('/signup'+'?email=1')
      }else {
        var insertSql = 'insert into user (firstname,lastname,email_id,password) value (?,?,?,?)';
        DB.query(insertSql, [req.body.firstname,req.body.lastname,req.body.email,shapass], function(err, insert_record) { 
            if (err) {
            res.status(500).send(JSON.stringify(err));
            return;
            }
            console.log(insert_record);
        res.redirect('/?success=1')
      })
    }
  })
})

router.get('/logout', function(req, res, next) {
  
  if (req.session.user) {
    res.redirect('/')
  }
});


module.exports = router;
