
const Router = require('koa-router')()

const db = require('../mysql').db

const UserController = require('../controller/user')
 



type Ctx = {
  query:object
  body:any
  request:{
    body:any
    [props:string]:any
  }
}

const userController = new UserController()
userController.moduleRoutes.forEach((el:any) => {
  const path = userController.modulePath+ el.path
  Router[el.method](path, (ctx: Ctx)=>{
      el.ctx = ctx
      el.fn()
    })
})





module.exports = Router