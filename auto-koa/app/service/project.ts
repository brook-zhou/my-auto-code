import SqlModel from "../framework/mysql"
const path = require("path")

export default class Project extends SqlModel {
  constructor() {
    super()
    const tableName = path.basename(__filename).split(".")[0].toLowerCase()
    this.initTable(tableName)
  }
}