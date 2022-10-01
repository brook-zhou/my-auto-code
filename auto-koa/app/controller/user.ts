const Controller = require('../base/decorate').controller
const Get = require('../base/decorate').get
const Post = require('../base/decorate').post

@Controller('user')
class User{

    @Get('index')
    async index(){
       (this as any).body =  (this as any).request.query;
    }

    @Get('info')
    async info(){
        (this as any).body = 123456;
    }

    

}

module.exports = User