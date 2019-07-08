const Controller = require('./controller');
const Category = require('../models/Category');

class categoryController extends Controller{
    constructor(){
        super();    // 不管父类有没有参数，都必须初始化
    }
    index(req,res){
        // res.send("后台分类功能首页")
        // 分页功能
        // console.log(req.query.page);

        Category.getCategoryDataAndCount(3, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/category", req.session);
        })
    }
    add(req,res){
        res.render("admin/categoryAdd", req.session);
    }
    addPost(req,res){
        Category.insertMany(req.body,(err,result)=>{
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category"});
                return;
            }
            res.redirect('/admin/category');
        })
    }
    del(req, res) {
        var id = req.query.id;
        Category.deleteOne({ "_id": id }, function (err) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category", date: 3000 })
            } else {
                res.redirect('/admin/category');
            }
        })
    }
    edit(req, res) {
        // res.send("后台分类修改");
        // findById('56ee117356acb568054dd6d4', { name: 1, age: 1, _id: 0 }
        Category.findById(req.query._id, function (err, result) {
            // console.log(result);
            req.session.result = result;
            // console.log(result);
            // console.log(req.session);
            res.render("admin/categoryEdit", req.session);
        })
        // console.log(req.query)  //  { _id: '5ce7ab8aefe34365263a2e3c' }
        // console.log(req.query._id)  //  5ce7ab8aefe34365263a2e3c
        // res.render("admin/categoryAdd", req.session);
        // res.render("admin/categoryEdit", req.session);
    }
    editPost(req, res) {
        // 9.2 修改
        // db.teachers.update({ name: '马哥1' }, { $set: { name: '老马' } });
        Category.update({ "_id": req.session.result._id }, {
            $set: {
                "username": req.body.username,
                "isAdmin": req.body.isAdmin
            }
        }, (err, result) => {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/category" });
                return;
            }
            res.redirect('/admin/category');
        }) 
        // console.log(req.body)  // [Object: null prototype] { username: 'bbb', isAdmin: 'true' }
        // console.log(req.body)   // [Object: null prototype] { username: 'bbb', isAdmin: 'false' }
        // console.log(req.session.result)     //{ isAdmin: true,
                                            //  _id: '5ce7ab8aefe34365263a2e3c',
                                            //  username: 'bill',
                                            //  password: '281c136bb4c72251cfa2af78963bec17'
                                            // }
        // console.log(req.session.result._id)    // 5ce7ab8aefe34365263a2e3c
    }
}

module.exports = new categoryController;