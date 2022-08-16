var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var bcrypt = require('bcryptjs');
var setToken = require('../../public/token')

// 1.校验管理员支付密码
router.post('/', function (req, res, next) {

    var sql = 'select * from stock_admin where admin_id=?'


    console.log("data", req.body)

    let data = [req.body.adminId]

    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            console.log("查询账户data", data)

            if (data.length > 0) {

                let passwordHash = data[0].paypwd
                // 密码hash校验解密
                bcrypt.compare(req.body.paypwd, passwordHash).then((results) => {

                    if (results) {

                        // 审核密码通过
                        var sql1 = 'update  stock_user_withdraw set state=?,updateBy=? where id=?'

                        let data1 = [req.body.state, req.body.updateBy, req.body.id]
                        db.query(sql1, data1, (err, data2) => {

                            if (err) {
                                res.send({
                                    code: 0,
                                    msg: "审核失败",

                                })
                            } else {

                                if (data2.affectedRows > 0) {

                                    res.send({
                                        code: 1,
                                        message: "审核成功",
                                    })

                                } else {
                                    res.send({
                                        code: 0,
                                        msg: "审核失败",

                                    })

                                }
                            }

                        })


                    } else {

                        res.send({
                            code: 0,
                            msg: "审核失败",
                        })
                    }

                });



            } else {

                res.send({
                    code: 0,
                    message: "审核失败",
                })
            }

        }

    })

});

module.exports = router;
