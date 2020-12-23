var express = require('express');
var router = express.Router();
var mongoUtil = require('../database');
var moment = require('moment');
var body_parser = require('body-parser');
const { ObjectId } = require('mongodb');


router.get('/', function(req, res, next) {
    var db = mongoUtil.getDb();

    db.collection("projects").find({user_id: ObjectId(req.session.user._id), favourite: "1"}).toArray().then((favorite_projects) => {
        db.collection("projects").find({user_id: ObjectId(req.session.user._id), favourite: "0"}).toArray().then((projects) => {
            
            favorite_projects.forEach((p) => {
                p.project_created_at = moment(p.project_created_at).format('DD/MM/YYYY HH:mm:ss');
              })
             
              projects.forEach((p)=> {
                p.project_created_at = moment(p.project_created_at).format('DD/MM/YYYY HH:mm:ss');  
              })

            res.send({
                      'favorite_projects' : favorite_projects,
                      'projects' : projects
                    });
        }).catch((error) => {
            res.status(500).send({error: error.message});
        });  
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });   
  });

router.get('/users', function(req, res, next) {
    var db = mongoUtil.getDb();
    
    // var cursor = db.collection("users").find();
    // var users = [];
    // await cursor.forEach((doc) => {
    //     users.push(doc);
    // });

    // res.send(users);

    db.collection("projects").find().toArray().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
  });

  router.post('/usersUpdate', function(req, res, next) {
    var db = mongoUtil.getDb();
    
    // var cursor = db.collection("users").find();
    // var users = [];
    // await cursor.forEach((doc) => {
    //     users.push(doc);
    // });

    // res.send(users);
    db.collection("users").updateOne({_id: ObjectId(req.body.id)}, {$set: {name: req.body.name}}).then((result) => {
        res.send(result);
        console.log(result);
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
  });


//   var updateResult = await db.collection("users").updateOne(where, {$set: {name: req.body.name}})
router.get('/selectUsers', function(req, res, next) {
    var db = mongoUtil.getDb();
    
    // var cursor = db.collection("users").find();
    // var users = [];
    // await cursor.forEach((doc) => {
    //     users.push(doc);
    // });

    // res.send(users);

    db.collection("users").find({_id: ObjectId(req.body.id1)}).toArray().then((result) => {
        res.send(result);
        console.log(result);
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
  });

  router.post('/deleteUsers', function(req, res, next) {
    var db = mongoUtil.getDb();
    console.log(req.body.id);
    
    db.collection("users").deleteOne({_id: ObjectId(req.body.id)}).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
  });

router.post('/addnewproject',function(req, res) {
    var db = mongoUtil.getDb();

    db.collection("projects").insertOne({user_id: ObjectId(req.session.user._id), project_name: req.body.project_name, favourite: req.body.fav, project_color : req.body.color, created_at: moment().format('YYYY-MM-DD HH:mm:ss')}).then((insertProjects) => {
        res.send(insertProjects);
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
});

router.post('/add_task',function(req, res) {
    var db = mongoUtil.getDb();
    
    db.collection("task").insertOne({project_id: ObjectId(req.body.pro_id), task_name: req.body.task, created_at: moment().format('YYYY-MM-DD HH:mm:ss')}).then((addTask) => {
        res.send({'addTask': addTask})
    }).catch((error) => {
        res.status(500).send({error: error.message});
    })
})

router.get('/tasks/:_id',function(req, res) {
    var db = mongoUtil.getDb();
    db.collection("task").find({project_id: ObjectId(req.params._id)}).toArray().then((task_details) => {

        task_details.forEach((t) => {
            t.created_at = moment(t.created_at).format('DD/MM/YYYY HH:mm:ss')
          });
          console.log(task_details);
        res.send({'task_details' : task_details});
    }).catch((error) => {
        res.status(500).send({error: error.message});
    })
});

router.get('/project-delete/:_id',function(req ,res) {
    var db = mongoUtil.getDb();
    
    db.collection("projects").deleteOne({_id: ObjectId(req.params._id)}).then((deleteProjects) => {
        res.send({'deleteProjects': deleteProjects})
    }).catch((error) => {
        res.status(500).send({error: error.message});
    })
});

router.post('/task-delete',function(req, res) {
    var db = mongoUtil.getDb();

    db.collection("task").deleteOne({_id: ObjectId(req.body.pro_id), task_name: req.body.taskName}).then((deleteTask) => {
        res.send({'deleteTask': deleteTask})
    }).catch((error) => {
        res.status(500).send({error: error.message});
    })
});

router.post('/updateproject',function(req, res) {
    var db = mongoUtil.getDb();

    db.collection("projects").updateOne({_id: ObjectId(req.body.pro_id)},{$set: {project_name: req.body.update_name}}).then((updateProjectName) => {
        res.send({'updateProjectName': updateProjectName})
    }).catch((error) => {
        res.status(500).send({error: error.message})
    })
});
  
module.exports = router;