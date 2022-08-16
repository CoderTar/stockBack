var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 1.用户身份验证失败重新上传验证
router.delete('/', function (req, res, next) {

    let sql = `delete from stock_user_idcard where userId=?`

    let data = [req.body.userID]

    db.query(sql, data, (err, data) => {


        if (err) {

            console.log("数据库报错", err)
        } else {



            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "删除成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "删除失败",
                })
            }
        }

    })
})


module.exports = router;
