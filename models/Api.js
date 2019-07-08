const mongoose = require("mongoose");

// 请求数据 http模块
const http = require("https");
// 数据库连接与服务器开启
mongoose.connect("mongodb://192.168.31.125:27017/xiangmu", { useNewUrlParser: true }, function (err) {
    if (err) {
        // throw Error(err);
        console.log("请检查数据库连接");
    }
})

// 数据库骨架
var book = mongoose.Schema({
    "bookname": String,
    "author_name": String,
    "book_cover": String,
    "introduction": String,
    "stat_name": String,
    "class_name": String
})

book.statics.bookDataAndCount = function (limit, pageData, callback) {
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

var Music = mongoose.model("book", book);

// 请求api接口，把数据导入本地数据库
var url = `https://www.apiopen.top/novelApi`;

// http.get(url, (res) => {
    // 数据请求一段一段接收
    // var data = "";
    // res.on("data", (chunk) => {
    //     data += chunk;
    // })
    // res.on("end", () => {
        // 字符串转json
        // let jsondata = JSON.parse(data);
        // // 把数据表里数据库
        // let musicjson = jsondata.data;
        // for(var i = 0;i < musicjson.length;i++){
        //     Music.insertMany({
        //         "bookname": musicjson[i].bookname,
        //         "author_name": musicjson[i].author_name,
        //         "book_cover": musicjson[i].book_cover,
        //         "introduction": musicjson[i].introduction,
        //         "stat_name": musicjson[i].stat_name,
        //         "class_name": musicjson[i].class_name
        //     }, function (err, doc) {
        //         console.log(doc[0].bookname + "----" + doc[0].id);
        //     })
        // }
        // console.log(musicjson[0].bookname);
        // console.log(musicjson);
    // })
    
// }).on("error", () => {
//     console.log("数据请求失败");
// })

module.exports = Music;