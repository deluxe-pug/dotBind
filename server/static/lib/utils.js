
// custom middleware function to make sure the user is logged in when accessing home page
exports.ensureAuthenticated = (req, res, next) => {
/*req.isAuthenticated() is created when user logs in as regular users
  req.session is created when user logs in as regular users */
  if (req.session.dotBind || req.isAuthenticated() || req.path === '/auth/github') { return next(); }
  res.redirect('/login')
};