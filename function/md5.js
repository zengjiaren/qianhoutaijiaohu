var md5 = require('md5');

module.exports = function (obj) {
     // { username: 'xiaoming', password: '123123' }
    // 1.数据验证
    // 2.返回数据正确格式，password加密
    var data = true;
    for(var val in obj){
        if(val == "username"){
            if(obj[val].length < 2 || obj[val].length > 12){
                data = false;
            }
        }else if(val == "password"){
            var reg = /^[a-zA-Z0-9]\w{5,17}$/;
            if(!reg.test(obj[val])){
                data = false;
            }
        }
    }
    if(data){ // 验证成功没有错误
        obj.password = md5(md5(obj["password"]).substr(11,7) + md5(obj["password"]));
        return obj;
    }else{
        return false;
    }
}