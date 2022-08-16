var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var bcrypt = require('bcryptjs');


// 1.用户修改登录密码
router.put('/', function (req, res, next) {

    var sql = 'update stock_user set password=? where user_id=?'

    bcrypt.genSalt(10, function (err, salt) {

        bcrypt.hash(req.body.password, salt, function (err, hash) {

            if (err) {
                res.send({
                    code: 0,
                    message: "修改失败",
                })
                console.log("加密失败", err)
            } else {

                db.query(sql, [hash, req.body.userId], (err, data) => {

                    if (err) {

                        console.log("err数据库sql失败", err)

                    } else {

                        console.log("data", data)

                        if (data.affectedRows > 0) {
                            res.send({
                                code: 1,
                                message: "修改成功",
                                data: data[0]
                            })

                        } else {

                            res.send({
                                code: 0,
                                message: "修改失败",
                            })
                        }

                    }

                })

            }

        });
    });

});

module.exports = router;
