const config = require("./config");
const path = require("path");

class ProfilePictures {
  static async onNewProfilePicture(p) {
    const destinationPath =path.join(
      config.livePath,
      "profile-pictures/"
    )
    console.log(p+ " move to " + destinationPath)
  }
}

module.exports = ProfilePictures;
