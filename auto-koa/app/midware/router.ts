
const Router = require('koa-router')

const koaBody = require('koa-body');
const db = require('../mysql').db

const UserController = require('../controller/user')
 
const router = new Router()

type Ctx = {
  query:object
  body:any
  requst:{
    body:any
    [props:string]:any
  }
}

const userController = new UserController()
userController.moduleRoutes.forEach((el:any) => {
  const path = userController.modulePath+ el.path

    router[el.method](path, (ctx: Ctx)=>{
      el.fn.apply(ctx)
    })
});

router.get('/',async (ctx:any)=>{
  console.log(UserController)
    ctx.body = 'home52'
})




module.exports = {router}