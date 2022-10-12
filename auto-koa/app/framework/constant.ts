const mysql = require("mysql2/promise")

export default function createConstant() {

  //jwt秘钥
  globalThis.jwtSecret = "api-voindflknpfasdacv"

  //全局返回构造
  globalThis.send = function (data: any = null, code: number = 200, msg: string = "请求成功"): ReturnData {
    return {
      code,
      msg,
      data,
    }
  }

  //mysql连接
  globalThis.sqlConn = mysql.createPool({
    host: "47.243.65.138",
    user: "bgss",
    password: "7AsAjLfwFY8jRGyy",
    database: "bgss",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
}
