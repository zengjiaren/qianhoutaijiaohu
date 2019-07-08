var express = require('express');
var router = express.Router();


// 函数  只要调用立即执行函数内代码段
// 函数体  只是调用函数体，只会返回函数本身

var adminController = require('../controller/adminController')
var categoryController = require('../controller/categoryController')
var goodsController = require('../controller/goodsController')
var apiController = require('../controller/apiController')
var musicController = require('../controller/musicController')

// router.get('/',(req,res)=>{
//     res.send("后台首页")
// })

router.get('/login', adminController.login);
router.post('/login', adminController.loginPost);
// 验证是否登录
router.use(adminController.validate);
router.get('/',adminController.index);
router.get('/out',adminController.out);

router.get('/home', adminController.home);

// 分类功能
router.get('/category',categoryController.index);
router.get('/category/add',categoryController.add);
router.post('/category/add',categoryController.addPost);
router.get('/category/del',categoryController.del);
router.get('/category/edit', categoryController.edit);
router.post('/category/edit', categoryController.editPost);

// API
router.get('/api', apiController.index);
router.get('/api/del', apiController.del);

// Music
router.get('/music', musicController.index);
router.get('/music/del', musicController.del);
router.post('/music/find', musicController.find);

// 商品功能
router.get('/goods',goodsController.index);
router.get('/goods/add',goodsController.add);
router.post('/goods/add',goodsController.addPost);
router.post('/goods/upload', goodsController.upload);
router.post("/goods/deleteImg", goodsController.deleteImg);
router.get('/goods/edit',goodsController.edit);
router.post('/goods/edit',goodsController.editPost);
router.get('/goods/del',goodsController.del);

module.exports = router;