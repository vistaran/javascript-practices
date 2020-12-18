var express = require('express');
var router = express.Router();  
var DB = require('../database');
var moment = require('moment');
session = require('express-session');
const { route } = require('.');

router.get('/', function (req, res) {
    var projectsSql = 'select * from projects where user_id = ? and favrite_project = "1" ';
    DB.query(projectsSql, [id], function(err, favorite_projects) { 
        if (err) {
        res.status(500).send(JSON.stringify(err));
        return;
        }
    
        var projectsSql = 'select * from projects where user_id = ? and favrite_project = "0"';
        DB.query(projectsSql, [id], function(err, projects) { 
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


router.get('/tasks/:project_id', function (req, res) {
    var taskSql = 'select * from task where project_id = ?';
    DB.query(taskSql, [req.params.project_id], function(err, task_details) { 
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
    var task_name = req.body.task;
    var project_id = req.body.pro_id;

    var addproject1 = 'insert into task (project_id,task_name,created_at) values (?,?,?)';
    DB.query(addproject1, [project_id, task_name, moment().format('YYYY-MM-DD HH:mm:ss')], function(err, insertTaskResults) { 
      if (err) {
          res.status(500).send(JSON.stringify(err));
          return;
      }
  
      res.send({'insertTaskResults' : insertTaskResults});
    });
  });

router.post('/addnewproject', function(req, res, next) {
    var str = req.body.project_name;
    var favrite = req.body.fav;
    var project_color = req.body.color;
    console.log(str,favrite,project_color);

    var addproject1 = 'insert into projects(user_id,project_name, project_created_at,favrite_project,project_color) values (?,?,?,?,?)';
    DB.query(addproject1, [user.id, str, moment().format('YYYY-MM-DD HH:mm:ss'),favrite,project_color], function(err, addProject) { 
      if (err) {
          res.status(500).send(JSON.stringify(err));
          return;
      }

      res.send({'addProject' : addProject});
    });
});
  
router.post('/task-delete', function(req, res, next) {
    var deletetask = 'delete from task where project_id = ? and task_name = ?';
    DB.query(deletetask, [req.body.pro_id,req.body.taskName], function(err, deletetask) { 
      if (err) {
          res.status(500).send(JSON.stringify(err));
          return;
      
        }
        console.log(deletetask);
      res.send(deletetask);  
    });
  });

router.get('/project-delete/:id', function(req, res, next) {
    var deleteproject = 'delete from projects where id = ?';
    DB.query(deleteproject,[req.params.id], function(err , delete_projects) {
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



module.exports = router;