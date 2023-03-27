const config = require("./config");
const path = require("path");
const fs = require("fs");

class ProfilePictures {
  static async onNewProfilePicture(p) {
    const destinationPath =path.join(
      config.livePath,
      "profile-pictures/"
    )
    let pathSplit = path.split("\\");
    if (pathSplit.length === 1) {
      pathSplit = pathSplit[0].split('/');
    }
    const filename = pathSplit[pathSplit.length-1]
    console.log(p+ " move to " + destinationPath);
    await fs.renameSync(p, destinationPath+filename);
  }
}

module.exports = ProfilePictures;
