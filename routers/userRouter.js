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
// 新增用户
router.post('/addNewUser',user.addNewUser);
// 获取所有用户
router.post('/getAllUsers',user.getAllUsers);
// 编辑用户
router.post('/editUserById',user.editUserById);
// 删除用户
router.post('/deleteUserById',user.deleteUserById);
//

module.exports = router.routes();