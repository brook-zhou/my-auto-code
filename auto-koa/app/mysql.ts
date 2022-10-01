const mysql = require('mysql2/promise')


module.exports =  {
    db:mysql.createPool({
            host:'localhost',
            port:3306,
            database:'auto_backend',
            user:'root',
            password:'123456789'
        })
    
}