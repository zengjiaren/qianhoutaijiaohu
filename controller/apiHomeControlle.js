// 继承
const Controller = require('./controller');
var Jiekou = require('../models/Jiekou');

class ApiHomeController extends Controller {
    constructor() {
        super(); // 不管父类有没有参数，都必须初始化
    }

    index(req, res) {
        // res.send("api首页");

        Jiekou.find(function (err, result) {
            // console.log(result);
            res.json({ code: "200", msg: "数据请求成功get", result });
        })
    }
    
}

module.exports = new ApiHomeController;