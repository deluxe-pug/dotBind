exports.regularAuth(req, res) => {
  // hit the nodal validating user end point
    // if the user is valid
      // set up session with username and token
      req.session.dotBind = {};
      req.session.dotBind.username = 'public';
      req.session.dotBind.access_token = 'fake token';
      // redirect to home page
      res.redirect('/');
    // if the user is not valid
      // send back response 'user not valid'
};