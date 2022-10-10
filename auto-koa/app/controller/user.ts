const Controller = require("../base/decorate").controller;
const Get = require("../base/decorate").get;
const Post = require("../base/decorate").post;

@Controller("user")
class User {
  @Get("index")
  async index() {
    (this as any).body = (this as any).request.query;
  }

  @Post()
  async info() {
    let a = (this as any);

    (this as any).ctx.body ={dd:21212,...(this as any).ctx.request.body}
  }


}

module.exports = User;
