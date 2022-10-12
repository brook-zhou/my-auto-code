
export default class SqlModel {
  conn: any
  tableName: string = ""
  conditions: string = ""

  initTable(tableName: string) {
    this.tableName = tableName
    this.conn = globalThis.sqlConn
    return this
  }


  name(tableName: string) {
    this.tableName = tableName
    return this
  }

  where(conditions: any[]) {
    if (conditions.length === 2) {
      this.conditions = `${conditions[0]}=${conditions[1]}`
    } else if (conditions.length === 3) {
      switch (conditions[1]) {
        case "in":
          this.conditions = `${conditions[0]} ${conditions[1]} (${conditions[2].join(",")})`
          break
        case "like":
          this.conditions = `${conditions[0]} ${conditions[1]} '%${conditions[2]}%'`
          break
        case "between":
          this.conditions = `${conditions[0]} ${conditions[1]}  ${conditions[2].join(" and ")}`
          break
        default:
          this.conditions = `${conditions[0]} ${conditions[1]} ${conditions[2]}`
      }
    }
    return this
  }

  select() {
    return new Promise(async (resolve, reject) => {
      let sql = `select * from ${this.tableName} ` + (this.conditions ? `where ${this.conditions}` : "")
      try {
        let [rows] = await this.conn.query(sql)
        resolve(rows)
      } catch {
        reject([])
      }
    })
  }
}
