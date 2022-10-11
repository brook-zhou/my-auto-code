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

export const Controller = (_name: string|null=null): ClassDecorator => {
  return (target: any) => {
    target.prototype.modulePath = `/${_name || target.name.toLowerCase()}`
  }
}

export const Get = (opt: Opt = {}): MethodDecorator => {
  return (target: any, key: string | symbol, desctiptor: any) => {
    createRoute(target, key , desctiptor,opt,'get')
  }
}

export const Post = (opt: Opt = {}): MethodDecorator => {
  return (target: any, key: string | symbol, desctiptor: any) => {
    createRoute(target, key , desctiptor,opt,'post')
  }
}

function createRoute(target: any, key: string | symbol, desctiptor: any,opt:Opt,type:string){
  const route: Route = {
    path: `/${"_path" in opt ? opt._path : <string>key}`,
    method: type,
    fn: desctiptor.value,
    auth: "_auth" in opt ? <boolean>opt._auth : defaultOptions.auth,
  }

  !target.moduleRoutes && (target.moduleRoutes = [])
  target.moduleRoutes.push(route)
}


// export const UnAuth = (_value?: any): MethodDecorator => {
//   return (target: any, key: string | symbol, desctiptor: any) => {
//     const path = `/${_value || <string>key}`;
//     target.moduleRoutes.forEach((item: Route) => {
//       item.path === path && (item.auth = false);
//     });
//   };
// };
