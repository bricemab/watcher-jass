const config = {
  isDev: true,
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
config.contactMail.logErr = config.contactMail.path+"logs/log-err.txt"
config.contactMail.logOut = config.contactMail.path+"logs/log-out.txt"

module.exports = config;
