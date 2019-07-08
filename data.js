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
var musicSchema = mongoose.Schema({ 
    "id": Number,    // 36270426
    "name": String,     // 来自天堂的魔鬼
    "singer": String,   // G.E.M.邓紫棋
    "pic": String,      // http://p2.music.126.net/kVwk6b8Qdya8oDyGDcyAVA==/1364493930777368.jpg?param=400y400
    "lrc": String,      // https://api.itooi.cn/music/netease/lrc?id=36270426&key=579621905
    "url": String,      // https://api.itooi.cn/music/netease/url?id=36270426&key=579621905
    "time": Number       // 245
    })

    var Music = mongoose.model("music",musicSchema);

// 请求api接口，把数据导入本地数据库
// var url = `https://api.apiopen.top/searchMusic?name=%22%E9%82%93%E7%B4%AB%E6%A3%8B%22`;
var url = `https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0&tdsourcetag=s_pcqq_aiomsg`;
var strurl = encodeURI(url);
http.get(strurl, (res) => {
    // 数据请求一段一段接收
    var data = "";
    res.on("data", (chunk) => {
        data += chunk;
    })
    res.on("end", () => {
        // 字符串转json
        let  jsondata = JSON.parse(data);
        // 把数据表里数据库
        let musicjson = jsondata.data.songs;
        // console.log(jsondata.data);
        // console.log(jsondata.data.songs);
        for(var key in musicjson){
            Music.insertMany({
                "id": musicjson[key].id,
                "name": musicjson[key].name,
                "singer": musicjson[key].singer,
                "pic": musicjson[key].pic,
                "lrc": musicjson[key].lrc,
                "url": musicjson[key].url,
                "time": musicjson[key].time
            },function(err,doc){
                    console.log(doc[0].name +"----" +doc[0].id);
            })
        }
    })
}).on("error", () => {
    console.log("数据请求失败");
})
