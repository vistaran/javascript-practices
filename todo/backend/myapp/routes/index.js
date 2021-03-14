var express = require('express');
var router = express.Router();
var cors = require('cors')
var DB = require('../database');
var moment = require('moment');
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

router.post('/getProject', function (req, res) {
  console.log(req.body.user_id)
  var projectsSql = 'select * from projects where user_id = ? and favrite_project = "1" ';
  DB.query(projectsSql, [req.body.user_id], function(err, favorite_projects) { 
      if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
      }
  
      var projectsSql = 'select * from projects where user_id = ? and favrite_project = "0"';
      DB.query(projectsSql, [req.body.user_id], function(err, projects) { 
          if (err) {
              res.status(500).send(JSON.stringify(err));
              return;
          }
      
          favorite_projects.forEach((p) => {
            p.project_created_at = moment(p.project_created_at).format('DD/MM/YYYY HH:mm:ss');
          })
         
          projects.forEach((p)=> {
            p.project_created_at = moment(p.project_created_at).format('DD/MM/YYYY HH:mm:ss');  
          })
          // send json response
          res.send({
              'favorite_projects': favorite_projects,
              'projects': projects
          });
      });
  });
});

router.post('/addnewproject', function(req, res, next) {
    var user_id = req.body.user_id;
    var str = req.body.project_name;
    var favrite = req.body.add_favorites;
    var project_color = req.body.project_color;
    console.log(str,favrite,project_color);

    var addproject1 = 'insert into projects(user_id,project_name, project_created_at,favrite_project,project_color) values (?,?,?,?,?)';
    DB.query(addproject1, [user_id, str, moment().format('YYYY-MM-DD HH:mm:ss'),favrite,project_color], function(err, addProject) { 
      if (err) {
          res.status(500).send(JSON.stringify(err));
          return;
      }

      res.send({'addProject' : addProject});
    });
});

router.post('/project-delete', function(req, res, next) {
  var deleteproject = 'delete from projects where id = ?';
  DB.query(deleteproject,[req.body.id], function(err , delete_projects) {
    if(err) {
      res.status(500).send(JSON.stringify(err));
      return;
    }
   res.send(delete_projects);
});
});

router.post('/updateproject', function(req, res, next) {
  var update = req.body.update_name;
  var project_id = req.body.pro_id;
  var updatesql = 'update projects set project_name = ? where id = ?';
  DB.query(updatesql, [update, project_id], function(err, updateProjectName) { 
    if (err) {
        res.status(500).send(JSON.stringify(err));
        return;
    }
    res.send(updateProjectName);
  });
});

router.post('/tasks', function (req, res) {
  var taskSql = 'select * from task where project_id = ?';
  DB.query(taskSql, [req.body.project_id], function(err, task_details) { 
    if (err) {
      res.status(500).send(JSON.stringify(err));
      return;
    }
    
    task_details.forEach((t) => {
      t.created_at = moment(t.created_at).format('DD/MM/YYYY HH:mm:ss')
    });

    res.send({'task_details': task_details});
  });  
});

router.post('/add_Task', function(req, res, next) {
  var project_id = req.body.pro_id;
  var task_name = req.body.task_name;

  var addproject1 = 'insert into task (project_id,task_name,created_at) values (?,?,?)';
  DB.query(addproject1, [project_id, task_name, moment().format('YYYY-MM-DD HH:mm:ss')], function(err, insertTaskResults) { 
    if (err) {
        res.status(500).send(JSON.stringify(err));
        return;
    }

    res.send({'insertTaskResults' : insertTaskResults});
  });
});

module.exports = router;
