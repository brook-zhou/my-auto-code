import { Controller, Post, Get } from "../../framework/decorate"
import {sign} from 'jsonwebtoken'
const secret = "testjwt"

@Controller()
class User {
  ctx: Ctx | any

  @Get({_auth:false})
  async index() {
    const token = sign({ name: 'moyufed' }, secret, { expiresIn: '3h' }) // token 有效期为3小时
    this.ctx.cookies.set(
        'token',
        token,
        {
            domain: 'localhost', // 设置 cookie 的域
            path: '/', // 设置 cookie 的路径
            maxAge: 3 * 60 * 60 * 1000, // cookie 的有效时间 ms
            httpOnly: true, // 是否要设置 httpOnly
            overwrite: true // 是否要覆盖已有的 cookie 设置
        }
    )
    this.ctx.body = token
  }

  @Post()
  async info() {
    this.do()
    this.ctx.body = this.ctx.request.body
  }

  do() {
    console.log(111111)
  }
}
export default User
