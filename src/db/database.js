const fs = require('fs');

class DB {
  constructor(pathToDB) {
    this.dbFile = JSON.parse(fs.readFileSync(pathToDB));
    this.currentTable = '';

    // console.log(JSON.stringify(this.dbFile, null, '\t'));
  }

  setCurrentTable(tableName) {
    this.currentTable = this.dbFile[tableName];
  }

  performQuery(param) {
    return this.currentTable[param];
  }
}

module.exports = {
  DB: DB,
};
