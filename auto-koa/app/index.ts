const koa = require('koa')
const routera = require('./midware/router').router

const app = new koa()
const bodyParser = require('koa-bodyparser')


app.use( function(ctx:any,next:any){


    ctx.set('Access-Control-Allow-Origin','*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    next()
})
// app.use(bodyParser())
// app.use(routera.routes())

app.use(async  (ctx:any,next:any)=>{

    
    if(ctx.method =='OPTIONS'){
        ctx.body = 1111
    }

        
    if(ctx.method =='POST'){
        next()
       let res =await paresPostData(ctx)
            ctx.body= res;
       
      
    }

    if(ctx.method =='GET'){

             ctx.body='test';
    }
})

app.listen(8000)


function paresPostData(ctx:any){
    return new Promise((resolve,reject)=>{
        try{
           let postData=''
           ctx.req.addListener('data',(data:any)=>{
               postData+=data
           })
           ctx.req.on('end', ()=>{
               resolve(postData)
           })

        }catch(err){
            reject(err)
        }
    })
}