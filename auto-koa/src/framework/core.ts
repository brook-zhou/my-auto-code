import cluster from "cluster";
const numCPUs = require("os").cpus().length;
const koa = require("koa")
const koaBody = require("koa-body")

export function createServer(port: number, route: any, opt: { cors?: Accessheader }) {

  if (cluster.isPrimary) {
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    // 监听worker
    cluster.on("listening", function (worker, address) {
      console.log(
        "listening: worker " +
          worker.process.pid +
          ", Address: " +
          address.address +
          ":" +
          address.port +
          "," +
          address.addressType
      );
    });
  
    // 监听worker退出事件，code进程非正常退出的错误code，signal导致进程被杀死的信号名称
    cluster.on("exit", function (worker, code, signal) {
      console.log("工作进程 %d 关闭 (%s)(%s). 重启中...");
  
      cluster.fork();
    });
  } else {

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
}
