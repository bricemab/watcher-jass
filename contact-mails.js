import fs from "fs";
import moment from "moment/moment";
import Utils from "./Utils";
import GlobalStorage from "./GlobalStorage";

export default class ContactMails {
  static async onNewContactMail(path, treatedDirectory) {
    const promisePool = GlobalStorage.getItem('dbConnection')
    let pathSplit = path.split("\\");
    if (pathSplit.length === 1) {
      pathSplit = pathSplit[0].split('/');
    }
    const filename = pathSplit[pathSplit.length-1]
    const emlPath = fs.readFileSync(path, "utf-8");
    const emlResponse = await Utils.emlFormatRead(emlPath);
    if (!emlResponse.success) {
      await Utils.writeErrLog("Error on emlReading on file: " + path);
    }
    const emlData = emlResponse.data;
    const from = emlData.from.email;
    const date = moment(emlData.date);
    const subject = emlData.subject;
    const content = emlData.text;
    const response = await Utils.executeSql(promisePool, "INSERT INTO `contact_messages` (`subject`, `content`, `date`, `email`) VALUES (:subject, :content, :date, :email)", {
      subject,
      content,
      date: date.format('YYYY-MM-DD HH:mm'),
      email: from
    });
    if (!response.success) {
      await Utils.writeErrLog("Error on saving data: " + response.error.toString())
    }
    console.log(treatedDirectory+"/"+filename);
    fs.rename(path, treatedDirectory+"/"+filename, async (err) => {
      if (err) {
        await Utils.writeErrLog("Error on moving the file: " + filename);
      }
    })
  }
}
