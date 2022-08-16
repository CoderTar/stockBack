var express = require('express');
var router = express.Router();
var db = require('../db/connect')
/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req)
  console.log("接口测试")
  let sql = 'select * from stock_user'
  db.query(sql, (err, data) => {
    res.send({
      code: 1,
      message: "登录成功",
      data: data
    })
  })

});

module.exports = router;
