import {Controller,Module, Post, Get, UnAuth } from "../../framework/controller"
import jwt from 'jsonwebtoken'
import Project from "../../service/project"

@UnAuth()
class User  extends Controller{
 
  constructor(){
    super()
  }

  @Get()
  async index() {
    const token = jwt.sign({ id:14,name: 'moyufed' }, globalThis.jwtSecret, { expiresIn: '3h' })

    this.ctx.body = token
  }

  @Get()
  async sql(){
    const d = new Project()
    this.ctx.body = send(await d.select())
  }

  @Post()
  async info() {
    this.ctx.body = this.ctx.request.body
  }

}
export default User
