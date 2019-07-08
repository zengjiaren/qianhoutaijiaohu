var express = require('express');
var router = express.Router();

var ApiHomeController = require('../controller/apiHomeControlle')
var ApiHomeGoodsController = require('../controller/apiHomeGoodsControlle')

router.get('/', ApiHomeController.index);
router.get('/list', ApiHomeGoodsController.list);

module.exports = router;