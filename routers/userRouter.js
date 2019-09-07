const router = require('koa-router')();
const user = require('../controllers/user');

// 登录接口
router.post('/userLogin',user.userLogin);
// 登出接口
router.get('/userLogOunt',user.userLogOut);
// 获取用户的个人信息
router.get('/getUserInfo',user.getUserInfo);
// 修改密码
router.post('/resetPassword',user.resetPasswrod);
// 用户上传头像
router.post('/uploadHeader',user.uploadHeader);


module.exports = router.routes();