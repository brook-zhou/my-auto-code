
import Router from './framework/router'
import {createServer} from './framework/core'


const cors:Accessheader = {
	'Access-Control-Allow-Origin':'*'
}

createServer(8000,Router,{
	cors:cors
})



