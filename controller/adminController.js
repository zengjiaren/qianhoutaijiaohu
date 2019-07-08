// 继承
const Controller = require('./controller');
var md5 = require('../function/md5');
var User = require('../models/User');

class AdminController extends Controller{
    constructor(){
        super(); // 不管父类有没有参数，都必须初始化
    }
   
    login(req,res){
        res.render("admin/login");
    }
    loginPost(req,res){
        // console.log(req.body);
        
        // 登录数据验证
        var fields = md5(req.body); // 1:失败——false;   2:成功——obj
        // console.log(fields);
        if(!fields){
            // res.render('admin/error',{err:"请输入正确的用户名密码",url:"/admin/login",date:3000});
            res.render('admin/error',{err:"请输入正确的用户名密码",url:"/admin/login"});
        }
        
        // 测试添加用户(数据库数据添加(一次)完毕)
        // User.insertMany({ "isAdmin": true, "username": "admin", "password": "281c136bb4c72251cfa2af78963bec17"},(err,result)=>{
        //     console.log("数据添加成功");
        // })

        // 数据库验证
        User.isUsernameAndPassword(fields,function (result) {
            if(result){
                // 添加session参数
                req.session.login = 1; //登录成功
                req.session.username = fields.username;
                // res.render("admin/index"); 
                res.render("admin/index",req.session); 
            }else{
                res.render("admin/error", { err: "请输入正确的用户名密码", url: "/admin/login"});
            }
        })
    }
    // 验证是否登录，过滤后台连接
    validate(req,res,next){
        if(req.session.login == "1"){
            next();
        }else{
            res.render("admin/login");
        }
    }
    index(req, res) {
        console.log(req.session);
        // res.send("后台首页")
        // res.render("admin/index");
        res.render("admin/index",req.session);
    }
    home(req, res) {
        res.render("admin/home", req.session);
    }
    // 退出登录
    out(req, res) {
        req.session.login = 0;
        req.session.username = null;
        res.render("admin/login");
    }
}

module.exports = new AdminController;