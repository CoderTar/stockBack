var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 1.管理员更改用户的账号状态
router.put('/', function (req, res, next) {

    let sql = `update stock_user set state=? where user_id=?`

    let data = [req.body.state, req.body.id]

    db.query(sql, data, (err, data) => {


        if (err) {

            console.log("数据库报错", err)
        } else {

            if (data.affectedRows > 0) {

                res.send({
                    code: 1,
                    message: "更新成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "更新失败",
                })
            }
        }

    })
})


module.exports = router;
