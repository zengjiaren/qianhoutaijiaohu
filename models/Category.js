var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false   // 默认不是管理员，true才是管理员
    }
})

// CategorySchema.method // 动态方法  把定义方法直接加入骨架Schema
// CategorySchema.statics  //静态方法   在骨架外定义方法，不属于骨架全局方法

CategorySchema.statics.getCategoryDataAndCount = function (limit, pageData, callback) {
    var page = 0;
    if (pageData != undefined) {
        page = pageData;
    }
    var _this = this;
    _this.find({}).limit(limit).skip(page * limit).then(function (result) {
        _this.find().countDocuments().then(function (num) {
            callback(result, Math.ceil(num / limit));
        })
    })
}

module.exports = mongoose.model("people", CategorySchema);