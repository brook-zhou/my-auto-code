import { Context } from "koa"

type Route = {
  path: string
  method: string
  fn: () => void
  auth: boolean
}

type Opt = {
  _auth?: boolean
  _path?: string
}

const defaultOptions = {
  auth: true,
}

export const UnAuth = (_name: string | null = null): ClassDecorator => {
    return (target: any) => {
      target.prototype.auth = false
    }
  }


export const Module = (_name: string | null = null): ClassDecorator => {
  return (target: any) => {
    target.prototype.modulePath = `/${_name || target.name.toLowerCase()}`
  }
}

export const Get = (opt: Opt = {}): MethodDecorator => {
  return (target: any, key: string | symbol, desctiptor: any) => {
    createRoute(target, key, desctiptor, opt, "get")
  }
}

export const Post = (opt: Opt = {}): MethodDecorator => {
  return (target: any, key: string | symbol, desctiptor: any) => {
    createRoute(target, key, desctiptor, opt, "post")
  }
}

function createRoute(target: any, key: string | symbol, desctiptor: any, opt: Opt, type: string) {
  !target.constructor.modulePath &&
    (target.constructor.prototype.modulePath = `/${target.constructor.name.toLowerCase()}`)
  const route: Route = {
    path: `/${"_path" in opt ? opt._path : <string>key}`,
    method: type,
    fn: desctiptor.value,
    auth: opt._auth ?? defaultOptions.auth,
  }

  !target.moduleRoutes && (target.moduleRoutes = [])
  target.moduleRoutes.push(route)
}

export class Controller {
  ctx: Context | any
  modulePath: string | any
}
