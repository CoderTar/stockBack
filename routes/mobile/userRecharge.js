var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var { createordernum } = require('../../public/randomOrderid')


// 1.用户进行账户充值
router.post('/', function (req, res, next) {

    console.log("data", req.body)

    var sql = 'insert into stock_user_recharge (userID,orderID,userName,amount,inPort,realName,phone) values(?,?,?,?,?,?,?)'




    let orderID = createordernum()

    console.log("orderid", orderID)

    let data = [req.body.userID, orderID, req.body.userName, req.body.amount, req.body.inPort, req.body.realName, req.body.phone]


    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            if (data.affectedRows > 0) {


                res.send({
                    code: 1,
                    message: "申请提交成功",
                })

            } else {

                res.send({
                    code: 0,
                    message: "申请提交失败",
                })
            }

        }

    })

});

module.exports = router;
