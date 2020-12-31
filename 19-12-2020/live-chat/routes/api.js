var express = require('express');
var router = express.Router();
var mongoUtil = require('../database');
var moment = require('moment');
const { ObjectId } = require('mongodb');


// router.get('/', function(req, res, next) {
//     var db = mongoUtil.getDb();

//     db.collection("projects").find({user_id: ObjectId(req.session.user._id), favourite: "1"}).toArray().then((favorite_projects) => {
//         db.collection("projects").find({user_id: ObjectId(req.session.user._id), favourite: "0"}).toArray().then((projects) => {
            
//             favorite_projects.forEach((p) => {
//                 p.project_created_at = moment(p.project_created_at).format('DD/MM/YYYY HH:mm:ss');
//               })
             
//               projects.forEach((p)=> {
//                 p.project_created_at = moment(p.project_created_at).format('DD/MM/YYYY HH:mm:ss');  
//               })

//             res.send({
//                       'favorite_projects' : favorite_projects,
//                       'projects' : projects,
//                     });
//         }).catch((error) => {
//             res.status(500).send({error: error.message});
//         });  
//     }).catch((error) => {
//         res.status(500).send({error: error.message});
//     });   
// });


    // var cursor = db.collection("users").find();
    // var users = [];
    // await cursor.forEach((doc) => {
    //     users.push(doc);
    // });

    // res.send(users);

router.get('/', function(req, res, next) {
    var db = mongoUtil.getDb();
    
    db.collection("users").find({
        _id: {
            $nin: [ObjectId(req.session.user._id)]
        }
    }).toArray().then((result) => {
        res.send({'result':result});
    }).catch((error) => {
        res.status(500).send({error: error.message});
    });
});

router.post('/createRoomUser',function(req, res) {
    var db = mongoUtil.getDb();
    db.collection("rooms").find({
        room_users: {
            $all : [ObjectId(req.body.Userid),ObjectId(req.session.user._id)]
        }}).toArray().then((selectRoomResult) => {
            console.log("Found rooms >>> ", ObjectId(selectRoomResult[0]._id));
            db.collection("messages").find({room_id : ObjectId(selectRoomResult[0]._id)}).toArray().then((sendMessagesdetails) => { 
                console.log(sendMessagesdetails);
                if (selectRoomResult.length > 0) {
                    res.send({'room': selectRoomResult[0],
                            'sendMessagesdetails': sendMessagesdetails});
                }else  {
                    console.log(ObjectId(req.body.Userid));
                    db.collection("rooms").insertOne({
                        room_users: [
                            ObjectId(req.session.user._id), ObjectId(req.body.Userid)
                        ],
                        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        update_at: moment().format('YYYY-MM-DD HH:mm:ss')
                    }).then((createRoomResult) => {
                            res.send({'room' : createRoomResult.ops[0]});    
                    }).catch((error) => {
                        res.status(500).send({error :error.message})
                    })
                }
            }).catch((error) => {
                res.status(500).send({error:error.message})
            })
    }).catch((error) => {
        res.status(500).send({error :error.message})
    })
})

router.post('/sendMessages',function(req, res) {
    var db = mongoUtil.getDb();
    db.collection("messages").insertOne({
        message: req.body.message, 
        room_id: ObjectId(req.body.room_users), 
        from_user_id: ObjectId(req.body.user_id),
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_at: moment().format('YYYY-MM-DD HH:mm:ss')}).then((sendMessagesdetails) => {
            res.send({'sendMessagesdetails': sendMessagesdetails})
    }).catch((error) => {
        res.status(500).send({error: error.message})
    })
})

router.post('/addnewproject',function(req, res) {
    var db = mongoUtil.getDb();
    db.collection("projects").find({user_id: ObjectId(req.session.user._id),project_name: req.body.project_name}).toArray().then((selectProject) => {
        console.log(selectProject);
        if (selectProject.length > 0) {
            res.send({'selectProject' : selectProject})            
        }else {
            db.collection("projects").insertOne({user_id: ObjectId(req.session.user._id), project_name: req.body.project_name, favourite: req.body.fav, project_color : req.body.color, created_at: moment().format('YYYY-MM-DD HH:mm:ss')}).then((insertProjects) => {
                res.send(insertProjects);
            }).catch((error) => {
                res.status(500).send({error: error.message});
            });
        }
    }).catch((error) => {
        res.status(500).send({error:error.message})
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