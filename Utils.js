const emlFormat = require("eml-format");
const fs = require("fs");

class Utils {
  static async executeSql(promisePool, sql, params) {
    try {
      await promisePool.execute(sql, params)
      return {
        success: true,
        data: {}
      };
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
  }

  static async emlFormatRead(eml) {
    return new Promise((resolve, reject) => {
      emlFormat.read(eml, function(error, emlJson) {
        if (error) {
          console.log(error)
          return reject({
            success: false,
            error
          });
        }
        resolve({
          success: true,
          data: emlJson
        })
      });
    })
  }

  static async writeErrLog(txt) {
    txt += "\r\n";
    return new Promise(resolve => {
      fs.appendFile(errLogPath, txt, function (err) {
        if (err) throw err;
        resolve({})
      });
    })
  }

  static async writeOutLog(txt) {
    txt += "\r\n";
    return new Promise(resolve => {
      fs.appendFile(outLogPath, txt, function (err) {
        if (err) throw err;
        resolve({})
      });
    })
  }

  static castMysqlRecordsToArray(rows) {
    if (Array.isArray(rows)) {
      return rows[0];
    }
  }

  static castMysqlRecordToObject(rows) {
    const [data] = rows;
    if (Array.isArray(data)) {
      return data[0];
    }
    return data;
  }

}

module.exports = Utils;
