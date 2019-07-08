const Controller = require('./controller');
const Api = require('../models/Api');

class apiController extends Controller {
    constructor() {
        super();    // 不管父类有没有参数，都必须初始化
    }
    index(req, res) {
        // res.send("api首页")
        Api.find({}, function (err, result) {
            if (err) {
                throw Error(err);
            }
            Api.bookDataAndCount(5, req.query.page, function (result, num) {
                req.session.result = result;
                req.session.pageCount = num;
                res.render("admin/api", req.session);
            })
            // req.session.result = result;
            // res.json({ "code": 200, "message": "json数据请求成功", "result": result })
            // res.render("admin/api", req.session);
        })
    }
    del(req, res) {
        var id = req.query.id;
        Api.deleteOne({ "_id": id }, function (err) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/api", date: 3000 })
            } else {
                res.redirect('/admin/api');
            }
        })

        // console.log(req.query.id)
        // res.send("api删除页")
    }
}

module.exports = new apiController;