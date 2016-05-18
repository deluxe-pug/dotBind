
// custom middleware function to make sure the user is logged in when accessing home page
exports.ensureAuthenticated = (req, res, next) => {
/*req.isAuthenticated() is created when user logs in as regular users
  req.session is created when user logs in as regular users */
  if (req.session.dotBind || req.isAuthenticated() || req.path === '/auth/github') { return next(); }
  res.redirect('/login')
};

exports.getTitleFromHtml = (html) => html.match(/\<.*title.*\>(.*)\<\/title\>/i)[1].trim();

exports.getDomainFromUrl = (url) => url.match(/https?\:\/\/www.((.*).com)\/?(.*)/i)[1];
