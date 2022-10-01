type Route = {
    path:string
    method:string
    fn:void
}


const controller = (_name?:string):ClassDecorator=>{

    return (target:any)=>{
        target.prototype.modulePath = `/${_name||target.name}`
    }
}

const get = (_value:any):MethodDecorator=>{
    return (target:any,key:string|symbol,desctiptor:any)=>{
        const route:Route = {
            path: `/${_value}`||<string>key,
            method:'get',
            fn: desctiptor.value
        }

        !target.moduleRoutes && (target.moduleRoutes = [])
        target.moduleRoutes.push(route)
       
    }
}

const post = (_value:any):MethodDecorator=>{
    return (target:any,key:string|symbol,desctiptor:any)=>{
        const route:Route = {
            path:`/${_value}`,
            method:'post',
            fn: desctiptor.value
        }

        !target.moduleRoutes && (target.moduleRoutes = [])
        target.moduleRoutes.push(route)
    }
}


module.exports = {
    controller,
    get,
    post
}