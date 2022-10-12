
require('module-alias/register')
import Router from '@/framework/router'
import {createServer} from '@/framework/core'
import createConstant from '@/framework/constant'


createConstant()


const cors:Accessheader = {
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Allow-Headers':'Content-Type,Content-Length,Authorization,Accept,X-Requested-With'
}

createServer(8000,Router,{
	cors:cors
})



