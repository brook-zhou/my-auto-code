export function createServer(port: number, route: any, opt: { cors?: Accessheader }) {
  const koa = require("koa")
  const koaBody = require("koa-body")

  const app = new koa()
  app
    .use(async (ctx: any, next: any) => {
      if (opt.cors) {
        for (let key in opt.cors) {
          ctx.set(key, (<any>opt.cors)[key])
        }
      }
      ctx.method === "OPTIONS" ? (ctx.body = 200) : await next()
    })
    .use(koaBody())
    .use(route.routes())
    .use(route.allowedMethods())
    .listen(port)
}
