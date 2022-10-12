import { Context } from "koa"
import controllers from "@/config/router.config"
import jwt from "jsonwebtoken"

const Router = require("koa-router")()

for (let builder of controllers) {
  const instance: any = new builder()
  for (let key in instance.moduleRoutes) {
    const path = instance.modulePath + instance.moduleRoutes[key].path

    Router[instance.moduleRoutes[key].method](
      path,
      async (ctx: Context, next: any) => {
        !instance.moduleRoutes[key].auth || instance.auth == false ? await next() : checkJwt(ctx, next)
      },
      async (ctx: Context, next: any) => {
        instance.ctx = ctx
        try{
          await instance.moduleRoutes[key].fn.apply(instance)
        }catch(err){
          ctx.body = err
        }
        await next()
      }
    )
  }
}

function checkJwt(ctx: Context, next: any) {
  const errorReturn = () => {
    ctx.response.status = 401
    ctx.response.body = "授权失败"
  }
  if (!ctx.header || !ctx.header.authorization) {
    errorReturn()
    return
  }
  const token = ctx.header.authorization.trim() || false
  console.log(token)
  if (!token) {
    errorReturn()
    return
  }

  jwt.verify(<string>token, globalThis.jwtSecret, async function (err, decoded) {
    if (err) {
      errorReturn()
      return
    } else {
      ctx.state.uid = (<any>decoded).id ?? 0
      await next()
    }
  })
}

export default Router
