const Controller = require('./controller');
const Music = require('../models/Music');

class apiController extends Controller {
    constructor() {
        super();    // 不管父类有没有参数，都必须初始化
    }
    index(req, res) {
        // res.send("api首页")
        Music.find({}, function (err, result) {
            if (err) {
                throw Error(err);
            }
            Music.musciDataAndCount(10, req.query.page, function (result, num) {
                req.session.result = result;
                req.session.pageCount = num;
                res.render("admin/music", req.session);
            })
            // req.session.result = result;
            // res.json({ "code": 200, "message": "json数据请求成功", "result": result })
            // res.render("admin/api", req.session);
        })
    }
    del(req, res) {
        var id = req.query.id;
        Music.deleteOne({ "_id": id }, function (err) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/music"})
            } else {
                res.redirect('/admin/music');
            }
        })

        // console.log(req.query.id)
        // res.send("api删除页")
    }

    find(req, res) {
        // console.log(req.body.seek);


        var reg = new RegExp(req.body.seek, 'i');
        Music.find({
            "name": { $regex: reg }
            // "singer": { $regex: reg }
        },(err,result)=>{
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/music" })
            }
            // console.log(result)
            req.session.result = result;
            res.render("admin/musicFind", req.session);
        });
        
        // Category.insertMany(req.body, (err, result) => {
        //     if (err) {
        //         res.render("admin/error", { err: "数据操作失败", url: "/admin/category" });
        //         return;
        //     }
        //     res.redirect('/admin/category');
        // })
    }
}

module.exports = new apiController;