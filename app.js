var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() == 'options')
    res.send(200); // 让options 尝试请求快速结束
  else
    next();
})

//跨域配用配置2
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("X-Powered-By", ' 3.2.1');
//   next();
// });


// jsonwebtoken用来生成token和解析token
var varToken = require("./public/token")

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  console.log("token", token)

  // 说明是登录接口不用请求头不用验证token
  if (token == undefined) {
    return next();
  } else {

    // 解析token
    varToken.verToken(token).then((data) => {
      req.data = data;
      console.log("token解析结果", data)
      return next();
    }).catch((error) => {
      console.log("token异常结果", error)
      return next();
    })
  }
});

// express-jwt是用来管理和验证token规则
// 1.设置那些接口不用校验token
var urlArray = require('./public/checkUrl')//导入校验的路径
var {
  expressjwt
} = require('express-jwt'); //解析token
// token验证
app.use(expressjwt({
  secret: 'd32ac0729bb03b80d96e174351167251',//秘钥
  algorithms: ['HS256']
}).unless({
  path: urlArray.arrList//除了这个地址，其他的URL都需要验证
}));

// 一定要有一个全局的错误处理
//token失效返回信息,通过失败处理
app.use(function (err, req, res, next) {
  res.status(401).send({
    message: 'token 过期',
    code: -1
  });
  //可以设置返回json 形式  res.json({message:'token失效'})
})



// 导入路由Api
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var basisconfig = require('./routes/mobile/basisConfig')
var updatebasisconfig = require('./routes/mobile/updatebasisconfig')
var imageAd = require('./routes/mobile/imageAd')
var uploadSwipeImg = require('./routes/web/uploadSwipe')
var updateAdtext = require('./routes/web/updateAdtext')
var deleteAd = require('./routes/web/deleteAd')
var addCard = require('./routes/mobile/bindingCard')
var effectiveBank = require('./routes/mobile/effectiveBank')
var userBank = require('./routes/mobile/userBank')
var updateCard = require('./routes/mobile/updateCard')
var checkRealname = require('./routes/mobile/realNameImg')
var realName = require('./routes/mobile/realName')
var getUserIdcard = require('./routes/mobile/getUserIdcard')
var userRegister = require('./routes/mobile/userRegister')
var userLogin = require('./routes/mobile/userLogin');
var updatePwd = require('./routes/mobile/updatePwd')
var checkIdentify = require('./routes/mobile/checkIdentity')
var getUserInfo = require('./routes/mobile/getUserinfo')
var getPayTpye = require('./routes/mobile/topupMoney')
var userRecharge = require('./routes/mobile/userRecharge')
var pageRecharge = require('./routes/web/pageRecharge')
var updateRecharge = require('./routes/web/updateRecharge')
var adminLogin = require('./routes/web/adminLogin')
var deleteIDcard = require('./routes/mobile/deleteIdCard')
var checkIdcard = require('./routes/web/checkIdCard')
var userWithdrawal = require('./routes/mobile/userWithdrawal')
var pageWithdrawal = require('./routes/web/pageWithdrawal')
var checkWithdrawal = require('./routes/web/checkWithdrawal')
var getAlluser = require('./routes/web/getAlluser')
var updateUserState = require('./routes/web/updateUserState')
var deleteUser = require('./routes/web/deleteUser')
var updateUserPwd = require('./routes/web/updateUserPwd')
// **********************************************web端**********************************************
// 1.上传轮播图
app.use('/Api/web/uploadSwipeImg', uploadSwipeImg)
// 2.修改广告文字和显示状态
app.use('/Api/web/updateAdtext', updateAdtext);
// 3.删除广告
app.use('/Api/web/deleteAd', deleteAd)
// 4.后他修改基本配置
app.use('/Api/mobile/updatebasisconfig', updatebasisconfig);
// 5.后台获取用户充值记录
app.use('/Api/web/adminPageRecharge', pageRecharge);
// 6.后台通过或拒绝充值申请
app.use('/Api/web/updateRecharge', updateRecharge);
// 7.管理员登录
app.use('/Api/web/adminLogin', adminLogin);
// 8.管理员审核身份证
app.use('/Api/web/checkIdcard', checkIdcard)
// 9.后他获取用户提现记录
app.use('/Api/web/pageWithdrawal', pageWithdrawal)
// 10.后台通过或拒绝支出
app.use('/Api/web/checkWithdrawal', checkWithdrawal)
// 11.后台获取会员列表
app.use('/Api/web/getAlluser', getAlluser)
// 12.后台更新会员启用或禁用
app.use('/Api/web/updateUserState', updateUserState)
// 13.后台更加id删除某个用户
app.use('/Api/web/deleteUser', deleteUser)
// 14.后台根据用户id修改密码
app.use('/Api/web/updateUserPwd', updateUserPwd)
// **********************************************移动端**********************************************
// 1.公司基本参数修改和获取
app.use('/Api/mobile/basisconfig', basisconfig);
// 2.获取首页轮播图
app.use('/Api/mobile/imageAd', imageAd);
// 3.用户添加银行卡
app.use('/Api/mobile/addCard', addCard);
// 4.获取有效银行
app.use('/Api/mobile/effectiveBank', effectiveBank);
// 5.根据用户id获取用户绑定的银行卡
app.use('/Api/mobile/userBankCard', userBank);
// 6.用户更新银行卡
app.use('/Api/mobile/userUpdateCard', updateCard)
// 7.1用户进行实名认证(文字)
app.use('/Api/mobile/realName', realName)
// 7.2用户进行实名认证(图片)
app.use('/Api/mobile/checkRealname', checkRealname)
// 8.获取用户实名认证信息
app.use('/Api/mobile/getUserIdcard', getUserIdcard)
// 9.用户注册
app.use('/Api/mobile/userRegister', userRegister)
// 10.用户登录
app.use('/Api/mobile/userLogin', userLogin)
// 11.用户修改密码
app.use('/Api/mobile/updatePwd', updatePwd)
// 12.用户校验身份
app.use('/Api/mobile/checkIdentify', checkIdentify)
// 13.获取用户信息
app.use('/Api/mobile/getUserInfo', getUserInfo)
// 14.用户获取充值账户
app.use('/Api/mobile/getPayTpye', getPayTpye)
// 15.用户进行充值
app.use('/Api/mobile/userRecharge', userRecharge)
// 16.用户重新上传身份证删除之前的
app.use('/Api/mobile/deleteIDcard', deleteIDcard)
// 16.用户重新上传身份证删除之前的
app.use('/Api/mobile/deleteIDcard', deleteIDcard)
// 17.用户提交提现申请
app.use('/Api/mobile/userWithdrawal', userWithdrawal)





// catch 404 and forward to error handler
// 捕获404并转发给错误处理程序
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
