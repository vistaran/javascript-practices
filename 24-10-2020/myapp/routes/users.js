var express = require('express');
var router = express.Router();
var DB = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/list_all_users', function(req, res, next) {
  try {
    
    DB.query('SELECT * FROM users where id = ?', [1], function (err, users) {
      if (err) {
        res.status(500).send(JSON.stringify(err));
        return;
      }
  
      for (let index = 0; index < users.length; index++) {
        users[index].password = undefined;
      }
  
      // console.log(users);
      // res.send(users);
      res.render('users', {employee_list: users, title: 'Users List'});
    });
  } catch (error) {
    res.status(500).send(JSON.stringify(err));
  }

});

module.exports = router;
