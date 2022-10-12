declare type Accessheader = {
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Headers"?: string;
    "Access-Control-Allow-Methods"?: string;
};


declare type ReturnData = {
    code:number
    msg:string
    data:any
}

var jwtSecret:string

var send:(data?:any,code?:number, msg?:string)=>ReturnData
var sqlConn:any

