var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.修改文字广告和显示状态
router.put('/', function (req, res, next) {

    var sql = 'update stock_user_card set id_card=?,bank_name=?,bank_province=?,bank_city=?,bank_card=?,bank_user=?,bank_mobile=?,bank_address=? where user_id=?'

    let data = [req.body.idCard, req.body.bankName, req.body.bankProvince,req.body.bankCity, req.body.bankCard,req.body.bankUser,req.body.bnakMobile, req.body.bankAddress, req.body.userId]

    console.log("data", data)
    db.query(sql, data, (err, data) => {

        if (err) {

            console.log("err数据库sql失败", err)

        } else {

            // console.log("data",data.affectedRows)

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

});

module.exports = router;
