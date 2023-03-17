const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");
const emlFormat = require('eml-format');
const moment = require('moment');
const config = require("config");
const GlobalStorage = require("GlobalStorage");
const { createPool } = require("mysql2");
const ContactMails = require("./contact-mails");
const ProfilePictures = require("./profile-pictures");
const outLogPath = path.join(config.watcherPath, "logs/log-out.txt");
const errLogPath = path.join(config.watcherPath, "logs/log-err.txt");
const watcherContactMailDirectory = path.join(
  config.watcherPath,
  "mails/new"
)
const treatedDirectory = path.join(
  config.watcherPath,
  "mails/treated"
);
const watcherProfilePictureDirectory = path.join(
  config.backendPath,
  "data/profile-pictures"
);

const liveProfilePicture = path.join(
  config.livePath,
  "profile-pictures"
)
const setup = async () => {
  const pool = createPool({
    host: "localhost",
    // user: "jass-prod",
    user: "root",
    database: "jass-game",
    // password: "N9Z1KzqLFudjmnYKi5TiEJ",
    password: "SQLadmin",
    waitForConnections: true,
    namedPlaceholders: true,
    connectionLimit: 20,
    queueLimit: 0
  });

  const promisePool = await pool.promise();
  GlobalStorage.addItem("dbConnection", promisePool);

  const watcherContactMail = chokidar.watch(watcherContactMailDirectory, {ignored: /^\./, persistent: true});
  watcherContactMail.on(
    'add',
    async (p) => {
      console.log("new file: "+p)
      await ContactMails.onNewContactMail(p, treatedDirectory);
    }
  )

  console.log('New watcher on '+watcherContactMailDirectory)
  console.log('New watcher on '+watcherProfilePictureDirectory)

  const watcherProfilePicture = chokidar.watch(watcherProfilePictureDirectory, {ignored: /^\./, persistent: true});
  watcherProfilePicture.on(
    'add',
    async (p) => {
      console.log("new file: "+p)
      await ProfilePictures.onNewProfilePicture(p);
    }
  )
}

setup().then(() => {
  console.log("Watcher is running...")
})