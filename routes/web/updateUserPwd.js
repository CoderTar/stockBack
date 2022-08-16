var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var bcrypt = require('bcryptjs');


// 1.管理员修改会员登录密码
router.put('/', function (req, res, next) {

    let sql = `update stock_user set password=? where user_id=?`

    bcrypt.genSalt(10, function (err, salt) {

        bcrypt.hash(req.body.newPwd, salt, function (err, hash) {
            if (err) {
                res.send({
                    code: 0,
                    message: "修改失败",
                })
            } else {

                let data = [hash, req.body.id]
                db.query(sql, data, (err, data) => {

                    if (err) {

                        console.log("err数据库sql失败", err)

                    } else {

                        console.log("data", data)

                        if (data.affectedRows > 0) {
                            res.send({
                                code: 1,
                                message: "修改成功",
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
})


module.exports = router;
