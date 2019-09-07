const query = require('../utils/sql');
module.exports = {
  async getAllCategories(ctx){
    let sql = `select * from categories`;
    let [categories] = await query(sql);
    ctx.body = categories.length > 0 ? {
      code : 200,
      msg : '获取成功',
      categories
    } : {
      code : 400,
      msg : '获取失败或者没有数据',
      categories
    }
  },
  async addNewCategory(ctx){
    let data = ctx.request.body;
    let sql = `insert into categories set ?`;
    let {affectedRows , insertId} = await query(sql,data);
    let [newCate] = await query(`select * from categories where id = ${insertId}`);

    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg :'操作成功',
      newCate
    } : {
      code : 400,
      msg :'操作失败'
    }
  },
  async editCategoryById(ctx){
    let info = ctx.request.body;
    let {id} = info;
    delete info.id;
    let sql = `update categories set ? where id = ${id}`;
    let {affectedRows} = await query(sql,info);
    ctx.body = affectedRows === 1 ? {
      code : 200,
      msg : '操作成功'
    } : {
      code : '400',
      msg: '操作失败'
    }
  },
  async deleteCategoryById(ctx){
    let {id} = ctx.request.body;
    let sql = `delete from categories where id = ${id}`;
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