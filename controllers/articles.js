const query = require('../utils/sql');

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

  },
  async addNewArticle(ctx){

  },
  async getArticleById(ctx){
     
  },
  async deleteArticleById(ctx){

  },
  async updateArticleById(ctx){

  }
}