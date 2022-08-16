var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 1.管理员通过或拒绝用户充值申请
router.put('/', function (req, res, next) {

    let sql = `update stock_user_recharge set state=? where id=?`

    let data = [req.body.state, req.body.id]

    db.query(sql, data, (err, data) => {


        if (err) {

            console.log("数据库报错", err)
        } else {



            if (data.affectedRows > 0) {


                // 修改用户表金额,用户id和金额
                var addSql = `update stock_user set account=account+? where user_id=? `
                let data1 = [parseInt(req.body.account), req.body.userID]

                db.query(addSql, data1, (err, data) => {

                    if (err) {
                        res.send({
                            code: 0,
                            message: "审核失败",
                        })
                    } else {
                        res.send({
                            code: 1,
                            message: "审核成功",
                        })
                    }
                })

            } else {

                res.send({
                    code: 0,
                    message: "审核失败",
                })
            }
        }

    })
})


module.exports = router;
