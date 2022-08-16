var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var bcrypt = require('bcryptjs');
var setToken = require('../../public/token')




// 1.管理员登录
router.post('/', function (req, res, next) {

    var sql = 'select * from stock_admin where userName=?'


    console.log("data", req.body)

    let data = [req.body.userName]


    console.log("data", req.body.password)
    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            console.log("查询账户data", data)

            if (data.length > 0) {

                let passwordHash = data[0].password

                // 密码hash校验解密
                bcrypt.compare(req.body.password, passwordHash).then((results) => {

                    if (results) {

                        // 删除返回前端密码
                        delete data[0].password
                        // 登录成功后使用用户id和账号生成token
                        setToken.setToken(data[0].user_id, data[0].userName).then((token) => {

                            res.send({
                                code: 1,
                                message: "登录成功",
                                data: data[0],
                                token: "Bearer" + " " + token
                            })
                        })

                    } else {

                        res.send({
                            code: 0,
                            msg: "账号或密码错误",
                        })
                    }

                });



            } else {

                res.send({
                    code: 0,
                    message: "账号或密码错误",
                })
            }

        }

    })

});

module.exports = router;
