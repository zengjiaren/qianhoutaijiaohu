const mongoose = require("mongoose");

// 请求数据 http模块
const http = require("https");
// 数据库连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/xiangmu", { useNewUrlParser: true }, function (err) {
    if (err) {
        // throw Error(err);
        console.log("请检查数据库连接");
    }
})

// 数据库骨架
var jiekou = mongoose.Schema({
    "bookname": String,
    "author_name": String,
    "book_cover": String,
    "introduction": String,
    "stat_name": String,
    "class_name": String
})

jiekou.statics.bookDataAndCount = function (limit, pageData, callback) {
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

var Jiekou = mongoose.model("jiekou", jiekou);

// 请求api接口，把数据导入本地数据库
// var url = `https://www.apiopen.top/novelApi`;

// http.get(url, (res) => {
// // 数据请求一段一段接收
// var data = "";
// res.on("data", (chunk) => {
//     data += chunk;
// })
// res.on("end", () => {
// // 字符串转json
// let jsondata = JSON.parse(data);
// // 把数据表里数据库
// let jiekoujson = jsondata.data;
// for(var i = 0;i < jiekoujson.length;i++){
//     Jiekou.insertMany({
//         "bookname": jiekoujson[i].bookname,
//         "author_name": jiekoujson[i].author_name,
//         "book_cover": jiekoujson[i].book_cover,
//         "introduction": jiekoujson[i].introduction,
//         "stat_name": jiekoujson[i].stat_name,
//         "class_name": jiekoujson[i].class_name
//     }, function (err, doc) {
//         console.log(doc[0].bookname + "----" + doc[0].id);
//     })
// }
// console.log(jiekoujson[0].bookname);
// console.log(jiekoujson);
// })

// }).on("error", () => {
//     console.log("数据请求失败");
// })

module.exports = Jiekou;