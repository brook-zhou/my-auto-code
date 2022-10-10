
const koa = require('koa')
const router = require('./midware/router')
const KoaBody = require('koa-body')

const app = new koa()

app.use(async(ctx:any,next:any)=>{
	ctx.set('Access-Control-Allow-Origin','*')
	ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
	ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	ctx.method==='OPTIONS'?ctx.body = 200:await next()
})
.use(KoaBody())
.use(router.routes())
.use(router.allowedMethods())
.listen(8000)