var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var ejs = require('ejs');

// 配置允许跨域
// 自定义跨域中间件
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// 模板引擎配置
app.engine('html',ejs.__express);
app.set('view engine','html');

// 引入静态文件
app.use(express.static("./public"));
app.use("/uploads",express.static("./uploads"));

//post数据请求处理 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// session配置
app.use(session({
    secret: "xiangmu", //验证 data+key
    resave: false,
    saveUninitialized: true
}))


// 第一模块 前台首页
app.use('/',require('./routers/Main'));

// 第二模块    后台首页
app.use('/admin',require('./routers/Admin'));

// 第三模块    API板块
app.use('/api',require('./routers/Api'));

// 数据库连接与服务器开启
// mongoose.connect("mongodb://192.168.31.125:27017/xiangmu",{useNewUrlParser:true},(err)=>{
//     if(err) {
//         throw Error("数据库连接失败");
//         // console.log("数据库连接失败")
//     }else{
//         // 网络监听
//         app.listen(3000, '192.168.31.125', () => { console.log("数据库连接成功、服务器开启成功，请访问：http://192.168.31.125:3000") })
//     }

// })
mongoose.connect("mongodb://127.0.0.1:27017/xiangmu",{useNewUrlParser:true},(err)=>{
    if(err) {
        throw Error("数据库连接失败");
        // console.log("数据库连接失败")
    }else{
        // 网络监听
        app.listen(3000, '127.0.0.1', () => { console.log("数据库连接成功、服务器开启成功，请访问：http://127.0.0.1:3000") })
    }

})

// app.listen(3000,'127.0.0.1',()=>{console.log("服务器开启成功，请访问：http://127.0.0.1:3000")})