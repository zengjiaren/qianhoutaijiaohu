var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false   // 默认不是管理员，true才是管理员
    }
})

userSchema.statics.isUsernameAndPassword = function (fields,callbak) {
    this.findOne({'username':fields.username},function (err,result) {
        // 判断密码
        if(result != null && fields.password == result.password && result.isAdmin == true){
            callbak(true);
        }else{
            callbak(false);
        }
    })
}

module.exports = mongoose.model("User",userSchema);