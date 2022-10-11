import { Context } from "koa"
import controllers from "../config/router.config"

const Router = require("koa-router")()
const jwt = require("koa-jwt")
const secret = "testjwt"


for (let builder of controllers) {
  const instance: any = new builder()
  for (let key in instance.moduleRoutes) {
    const path = instance.modulePath + instance.moduleRoutes[key].path

    Router[instance.moduleRoutes[key].method](
      path,
      jwt({
        secret,
        debug: true,
      }).unless({ path: [!instance.moduleRoutes[key].auth ? path : null] }),
      (ctx: Context) => {
        ;(<any>this).auth = true
        instance.ctx = ctx
        instance.moduleRoutes[key].fn.apply(instance)
      }
    )
  }
}

export default Router
