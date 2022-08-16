var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var bcrypt = require('bcryptjs');


// 1.用户注册
router.post('/', function (req, res, next) {

    var sql = 'insert into stock_user(userName,password,nickName,interior) values(?,?,?,?)'
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

            if (err) {
                res.send({
                    code: 0,
                    message: "注册失败",
                })
                console.log("加密失败", err)
            } else {

                let data = [req.body.userName, hash, req.body.nickName, req.body.interior]
                console.log("data", data)
                db.query(sql, data, (err, data) => {

                    if (err) {

                        console.log("err数据库sql失败", err)

                    } else {

                        console.log("data", data)

                        if (data.affectedRows > 0) {
                            res.send({
                                code: 1,
                                message: "注册成功",
                                data: data[0]
                            })

                        } else {

                            res.send({
                                code: 0,
                                message: "注册失败",
                            })
                        }

                    }

                })

            }

        });
    });



});

module.exports = router;
