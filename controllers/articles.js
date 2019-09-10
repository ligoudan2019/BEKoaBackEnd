const query = require('../utils/sql');
const upload = require('../utils/upload');
const ip = '127.0.0.1';
const port = 9900;

module.exports = {
  async getArticlesByPagination(ctx) {
    let { categoryId, status, pageIndex, pageSize } = ctx.query;
    let pageSql = `SELECT a.id,a.title,a.created,a.\`status\`,
    c.\`name\`,u.nickname `;
    let countSql = `select count(*) as total `;
    let condictions = ` from 
      posts a left JOIN users u on u.id = a.user_id
      LEFT JOIN categories c on a.category_id = c.id
      WHERE 1 = 1 `;
    if(categoryId !== 'all'){
      condictions += ` AND a.category_id = '${categoryId}' `;
    }
    if(status !== 'all'){
      condictions += ` and a.\`status\` = '${status}' `;
    }

    let offset = (pageIndex - 1) * pageSize;
    // 拼接
    pageSql += condictions + ` LIMIT ${offset},${pageSize} `;
    countSql += condictions;
    // console.log(countSql);
    // console.log(pageSql);
    // 查询
    let data = await query(pageSql);
    let [obj] = await query(countSql);
    // console.log(datas);
    // console.log(obj.total);
    ctx.body = data.length > 0 ? {
      code : 200,
      msg : '获取成功',
      data,total : obj.total
    } : {
      code : 200,
      msg : '获取失败'
    }
  },
  async uploadArticlePic(ctx){
    let {pic} = await upload(ctx,'articles');
    let start = pic.path.indexOf('uploads') - 1;
    let path = `http://${ip}:${port}` + pic.path.substring(start).replace(/\\/g,'/');
    ctx.body = {
      code : 200,
      msg : '上传成功',
      path
    }
  },
  async addNewArticle(ctx){
    let {data} = ctx.request.body;
    let user_id = ctx.session.userInfo.id;
    data.user_id = user_id;
    let sql = `insert into posts set ?`;
    let {affectedRows} = await query(sql,data);
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功'
    } : {
      code : '400',
      msg: '操作失败'
    }
  },
  async getArticleById(ctx){
    let {id}  = ctx.require.body;
    let sql= `select * from posts where id = ${id}`;
    let [article] = await query(sql);
    ctx.body = article ? {
      code : 200,
      msg : '操作成功',
      data : article
    } : {
      code : '400',
      msg: '操作失败'
    }
  },
  async deleteArticleById(ctx){
    let {id} = ctx.request.body;
    let sql = `delete from posts where id = ${id}`;
    let {affectedRows} = await query(sql);
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功'
    } : {
      code : '400',
      msg: '操作失败'
    }
  },
  async updateArticleById(ctx){
    let data = ctx.request.body;
    let {id} = data;
    delete data.id;
    let sql = `update posts set ? where id = ${id}`;
    let {affectedRows} = await query(sql,data);
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功'
    } : {
      code : '400',
      msg: '操作失败'
    }
  }
}