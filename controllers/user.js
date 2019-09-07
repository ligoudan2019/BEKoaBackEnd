const query = require('../utils/sql');
const upload = require('../utils/upload');
const ip = '127.0.0.1';
const port = 9900;

module.exports = {
  async userLogin(ctx){
    // 解构变量，准备sql语句
    let {email,password} = ctx.request.body;
    let sql = `select * from users where email = '${email}' and password = '${password}'`;  
    // 调用查询数据库的方法得到数据
    let [user] = await query(sql);
    // session 存储用户信息
    user && (ctx.session.user = user);
    let {id,nickname,avatar} = user;
    // 返回信息写入 响应体
    ctx.body = user ? { code : 200, msg : '登录成功' , userInfo : {id,nickname,avatar} }:{ code : 400,msg: '用户名或者密码错误' }
  },
  async userLogOut(ctx){
    ctx.session.user = null;
    ctx.body = {
      code : 200, msg : '登出成功'
    }
  },
  async getUserInfo(ctx){
    let {id} = ctx.query;
    let sql = `select * from users where id = '${id}'`;
    let [userInfo] = await query(sql);
    userInfo && delete userInfo.password;
    ctx.body = userInfo ? {
      code : 200,
      msg : '获取成功',
      data : userInfo
    } : {
      code : 400,
      msg : '没有该用户的数据'
    }
  },
  async resetPasswrod(ctx){
    let {id,oldPass,newPass} = ctx.request.body;
    console.log(id,oldPass,newPass);
    let validate = `SELECT count(id) as total FROM users WHERE id = '${id}' and \`password\` = '${oldPass}'`;
    let [result] = await query(validate);
    // console.log(result);
    let {total} = result;
    if(total > 0){
      let sql = `UPDATE users SET \`password\` = '${newPass}' WHERE id = '${id}'`;
      let {affectedRows} = await query(sql);

      ctx.body = affectedRows === 1 ? {
        code : 200,
        msg : '修改成功'
      }:{
        code : 500,
        msg : '修改失败'
      }      
    }else {
      ctx.body = {
        code : 400,
        msg : '旧密码不正确'
      }
    }
  },
  async uploadHeader(ctx){
    let {head} = await upload(ctx);
    let start = head.path.indexOf('uploads') - 1;
    let path = `http://${ip}:${port}` + head.path.substring(start).replace(/\\/g,'/');
    ctx.body = {
      code : 200,
      msg : '上传成功',
      path
    }
  },
  async getAllUsers(ctx){
    let sql = `select * from users`;
    let users = await query(sql);
    let data = users.map(e=>{
      return {
        id : e.id,
        slug : e.slug,
        email : e.email,
        nickname : e.nickname,
        avatar : e.avatar,
        status : e.status
      }
    });

    if(data.length !== 0){
      ctx.body = {
        code : 200,
        msg : '获取成功',
        data
      }
    }else {
      ctx.body = {
        code : 400,
        msg : '没有数据或者获取失败',
        data
      }
    }
  },
  async addNewUser(ctx){
    let info = ctx.request.body;
    let sql = `insert into users set ?`;
    let { affectedRows,insertId } = await query(sql,info);
    let [user] = await query(`select * from users where id = ${insertId}`);
    let { id,slug,email,nickname,avatar,status } = user;
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功',
      data : {
        id , slug,email,nickname,avatar,status
      }
    } : {
      code : '400',
      msg: '操作失败'
    }
  },
  async editUserById(ctx){
    let info = ctx.request.body;
    let {id} = info;
    delete info.id;
    let sql = `update users set ? where id = ${id}`;
    let {affectedRows} = await query(sql,info);
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功'
    } : {
      code : '400',
      msg: '操作失败'
    }
  },
  async deleteUserById(ctx){
    let {id} = ctx.request.body;
    let sql = `delete from users where id = ${id}`;
    let {affectedRows} = await query(sql);
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功'
    } : {
      code : '400',
      msg: '操作失败'
    }
  }
}