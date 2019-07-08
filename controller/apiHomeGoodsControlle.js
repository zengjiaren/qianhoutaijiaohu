// 继承
const Controller = require('./controller');
var User = require('../models/User');

class ApiHomeController extends Controller {
    constructor() {
        super(); // 不管父类有没有参数，都必须初始化
    }

    list(req, res) {
        res.send("api列表页");
    }

}

module.exports = new ApiHomeController;