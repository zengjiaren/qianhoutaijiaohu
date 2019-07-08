
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

// 暴露
exports.init = function (req,callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./tupianhuancun";
    form.parse(req,function (err,fields,files) {
        if(err){
            throw Error(err);
        }
        // 判断图片大小
        var size = parseInt(files.file.size / 1024 / 1024);//字节 - KB -M
        // 图片过大，删除本地数据
        if(size > 5){
            fs.unlink("./" + files.file.path,function (err) {
                callback({err:"图片不能超过5M"});
                return;
            })
        }
        // 修改图片名称 时间戳+随机数+后缀名
        var tt = sd.format(new Date(), "YYYYMMDDHHmmss");
        var rr = parseInt(Math.random() * 89999 + 10000);
        var ext = path.extname(files.file.name);

        // 旧路径
        var oldPath = "./" + files.file.path;
        // 新路径
        var newPath = path.normalize(__dirname + "/../uploads/" + tt + rr + ext);
        // 修改
        fs.rename(oldPath,newPath,function (err) {
            if(err){
                throw err;
            }
            var imgurl = "/uploads/" + tt + rr + ext;
            callback({ err:200,url:imgurl });
        })
    })
}