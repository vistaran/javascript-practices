const { json } = require('express');
var express = require('express');
var router = express.Router();
var DB = require('../database')
var InsertQuery = require('../node_modules/mysql-insert-multiple');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var insertSql1 = 'select * from emplyoees ';
    DB.query(insertSql1, [], function(err, user) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
            return;
        }
        console.log(user);
        //res.send(user);
        res.render('users', {employee_list: user, title: 'Users List'});
    });
});

router.post('/', (req, res) => {
    var name = req.body.name;
    var address = req.body.addresses;
    var phones = req.body.phones;

    var insertSql1 = 'insert into emplyoees(emp_name) values (?)';
    DB.query(insertSql1, [name], function(err, user) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
            return;
        }
        console.log(user.insertId);

        var insertSql = 'insert into emp_address(e_id,emp_address) values (?)';
        for (let i = 0; i < address.length; i++) {
            var array = [
                [user.insertId],
                [address[i]]
            ]
            DB.query(insertSql, [array], function(err, user) {
                if (err) {

                    res.status(500).send(JSON.stringify(err));
                    return;

                }
            });
        }

        var insertSql2 = 'insert into emp_phone(e_id,phone_no,provider) values (?)';
        phones.forEach((currentElement) => {
            var array = [
                [user.insertId],
                [currentElement.mobile_no],
                [currentElement.provider]
            ]
            DB.query(insertSql2, [array], function(err, user) {
                if (err) {

                    res.status(500).send(JSON.stringify(err));
                    return;

                }
            });
        });
        res.send(user);
    });
});

router.delete('/', function(req, res, next) {
    var user_id = req.body.id
    var insertSql1 = 'delete from emplyoees where e_id = ?';
    DB.query(insertSql1, [user_id], function(err, user) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
            return;
        }


        var insertSql = 'delete from emp_address where e_id = ?';
        DB.query(insertSql, [user_id], function(err, user) {
            if (err) {
                res.status(500).send(JSON.stringify(err));
                return;
            }
        });

        var insertSql2 = 'delete from emp_address where e_id = ?';
        DB.query(insertSql2, [user_id], function(err, user) {
            if (err) {
                res.status(500).send(JSON.stringify(err));
                return;
            }
        });
        res.send(user);
    });
});

router.put('/', (req, res) => {
    var name = req.body.name;
    var address = req.body.addresses;
    var phones = req.body.phones;
    var id = req.body.id;

    var insertSql1 = 'update emplyoees set emp_name = (?) where e_id = (?)';
    DB.query(insertSql1, [name, id], function(err, user) {
        if (err) {
            res.status(500).send(JSON.stringify(err));
            return;
        }
        console.log(user.id);
        var insertSql = 'update emp_address set emp_address = ? where e_id = ?';
         for (let i = 0; i < address.length; i++) {
             var array = [
                 [address[i]]
             ]
             DB.query(insertSql, [array,id], function(err, user) {
                 if (err) {

                     res.status(500).send(JSON.stringify(err));
                     return;

                 }
             });
         }
        var insertSql2 = 'update emp_phone set phone_no = ? ,provider = ? where e_id = ?';
        phones.forEach((currentElement) => {
            DB.query(insertSql2, [currentElement.mobile_no,currentElement.provider,id], function(err, user) {
                if (err) {

                    res.status(500).send(JSON.stringify(err));
                    return;

                }
            });
        });
        res.send(user);
    });
});

router.post('/abc', function(req, res, next) {
    try {
        var columns = [
            'emplyoee.emplyoee_name',
            'emplyoee.salary',
            'emplyoee.join_at',
            'emplyoees_phone.emplyoees_phone',
            'emplyoees_phone.provider',
            'emplyoess_address.address '
        ];
        var str = 'SELECT ' + columns.join(',') + ' from emplyoee join emplyoess_address on emplyoee.e_id = emplyoess_address.e_id join emplyoees_phone on emplyoee.e_id = emplyoees_phone.e_id group by emplyoee.emplyoee_name having provider = "jio";';
        DB.query(str, [], function(err, user) {
            if (err) {

                res.status(500).send(JSON.stringify(err));
                return;

            }

            res.send(user);
        });
    } catch (error) {

        res.status(404).send(JSON.stringify(err));

    }
});

module.exports = router;