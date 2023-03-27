const config = require("./config");
const path = require("path");
const fs = require("fs");

class ProfilePictures {
  static async onNewProfilePicture(p) {
    const destinationPath =path.join(
      config.livePath,
      "profile-pictures/"
    )
    let pathSplit = p.split("\\");
    if (pathSplit.length === 1) {
      pathSplit = pathSplit[0].split('/');
    }
    const filename = pathSplit[pathSplit.length-1];
    const destinationFile = destinationPath+filename
    console.log(p+ " move to " + destinationFile);
    await fs.renameSync(p, destinationFile);
  }
}

module.exports = ProfilePictures;
