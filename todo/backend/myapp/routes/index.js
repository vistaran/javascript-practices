var express = require('express');
var router = express.Router();
var cors = require('cors')
var DB = require('../database');
var crypto = require('crypto');

/* GET home page. */

var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/', function(req, res, next) {
  // console.log(req.params.data)
      res.render('index')
});


router.post('/login', cors(corsOptions) ,function(req, res, next) {
  // console.log(req.params.data)

  var hash = crypto.createHash('sha1');
  shapass = hash.update(req.body.password, 'utf-8').digest('hex');
  console.log(shapass);

  console.log(req.body.username,req.body.password)
  var projectsSql = 'select * from user where email_id = ? and password = ?';
  DB.query(projectsSql, [req.body.username,shapass], function(err, users) { 
      if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
      }
      console.log(users)
      res.send(users)
    });
});

module.exports = router;
