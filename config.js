const config = {
  isDev: true,
  database: {
    host: "localhost",
    user: "jass-prod",
    password: "N9Z1KzqLFudjmnYKi5TiEJ",
    database: "jass-game"
  },
  frontendPath: "/srv/www/frontend-jass/",
  backendPath: "/srv/www/rest-jass/",
  watcherPath: "/srv/www/watcher-jass/",
  livePath: "/srv/www/live-jass/",
  contactMail: {
    path: "/home/contact/Maildir/",
    logOut: "",
    logErr: "",
  },
}
config.contactMail.logErr = config.watcherPath+"logs/log-err.txt"
config.contactMail.logOut = config.watcherPath+"logs/log-out.txt"

module.exports = config;
