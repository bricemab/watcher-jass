import config from "./config";
import path from "path";

export default class ProfilePictures {
  static async onNewProfilePicture(p) {
    const destinationPath =path.join(
      config.livePath,
      "profile-pictures/"
    )
    console.log(p+ " move to " + destinationPath)
  }
}
