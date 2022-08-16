var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 1.管理员审核身份证
router.put('/', function (req, res, next) {


    let sql = `update stock_user_idcard set state=? where id=?`

    let data = [req.body.state, req.body.id]

    db.query(sql, data, (err, data) => {


        if (err) {

            console.log("数据库报错", err)
        } else {

            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "审核成功",
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
