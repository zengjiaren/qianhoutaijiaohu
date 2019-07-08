var Controller = require('./controller');
var fs = require('fs');

var uploads = require('../function/upload');
var Goods = require('../models/Goods');

class goodsController extends Controller{
    constructor(){
        super();
    }
    index(req,res){
        Goods.getGoodsDataAndCount(3, req.query.page, function (result, num) {
            req.session.result = result;
            req.session.pageCount = num;
            res.render("admin/goods", req.session);
        })
    }
    add(req,res){
        res.render('admin/goodsAdd',req.session);
    }
    // 提交数据
    addPost(req,res){
        // console.log(req.body);
        Goods.insertMany(req.body,function (err,result) {
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods"});
            }else{
                res.redirect('/admin/goods');
            }
        })
    }
    // 添加图片
    upload(req,res){
        // 上传图片功能
        uploads.init(req,function (data) {
            if(data.err == 200){
                res.json(data);
            }else{
                res.render("admin/error", { err: data.err, url: "/admin/goods/add" });
            }
        })
    }
    // 删除图片
    deleteImg(req, res) {
        fs.unlink("./" + req.body.url, function (err) {
            res.send("1")
            return;
        })
    }

    // 修改功能
    edit(req,res){
        var id = req.query.id;
        Goods.findOne({_id:id},function (err,result) {
            if(err){
                throw Error(err);
            }
            req.session.result = result;
            res.render('admin/goodsEdit',req.session);
        })
        // res.render('admin/goodsEdit', req.session);
    }
    // 修改数据
    editPost(req,res){
        Goods.updateOne({_id:req.body.id},req.body,function (err,result) {
            if(err){
                res.render("admin/error", { err: "数据操作失败", url: "/admin/goods" });
            }else{
                res.redirect('/admin/goods');
            }
        })
        // console.log(req.body.id)
    }

    // 删除功能
    del(req,res){
        Goods.findAndDelete(req.query.id,function () {
            res.redirect("/admin/goods");
            return;
        })
    }
}

module.exports = new goodsController;