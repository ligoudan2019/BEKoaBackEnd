const Koa = require('koa');
const session = require('koa-session');
const bodyparser = require('koa-bodyparser');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const app = new Koa();

// cookie 加密签名
app.keys = ['whatever who you are'];
// session配置
const CONFIG = {
  key: 'koa:sess', /** 加密cookie的key */
  /** cookie过期时间 ， 默认是一天 */
  maxAge: 86400000,
  autoCommit: true, /** 自动提交到响应头 */
  overwrite: true, /** 允许重写 */
  httpOnly: true, /** 表示是否可以通过javascript来修改，设成true会更加安全 */
  signed: true, /** 设置签名，防止cookie被修改 */
  rolling: false, /** 第次请求都更新session */
  renew: true, /** 有效期过半，是否更新session */
};

app.use(session(CONFIG,app));

// 注册bodyparser中间件
app.use(bodyparser());

// 注册用户接口路由
app.use(userRouter);
app.use(categoryRouter);

app.listen(9900,(err)=>{
  err && console.error(err);
  console.log('server is running at : http://127.0.0.1:9900');
})