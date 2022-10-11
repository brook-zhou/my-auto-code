declare type Accessheader = {
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Headers"?: string;
    "Access-Control-Allow-Methods"?: string;
};


declare type Ctx = {
    app:any
    body:any
    response:any
    request:{
        query:any
        body:any
    },
    originalUrl:string
    [propName:string]:any
}