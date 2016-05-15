const path = require('path');
const request = require('request');

exports.regularAuth = (req, res) => {
  // incorporate kevin's code
};

exports.index = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/index.html'));
};

exports.login = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/login.html'));
};

exports.auth = (req, res) => {
  console.log('--> this is the user object on req: ', req.user);
  console.log('--> This is the session object on req', req.session);
  // passport with github persist session
  if ( req.user ) {
    res.send(req.user);
  // regular user login, no session has been created?
  } else if ( req.session.dotBind ) {
    res.send(req.session.dotBind);
  } else {
    res.send('something is not right... see server.js');
  }
};

exports.logout = (req, res) => {
  // Destroy Access Token in database

  request({
    uri: `http://localhost:3000/v1/users?username=${req.user.username}`,
    method: 'GET',
  }, function(err, message, response) {
    if (err) {
      console.error('error: ', err);
      return;
    }
    const user_id = JSON.parse(response).data[0].id;
    const access_token = req.user.access_token;
    const deleteURI = `http://localhost:3000/v1/access_tokens/${user_id}/?access_token=${access_token}`;

    request({
      uri: deleteURI,
      method: 'DELETE'
    }, function(error, message2, response2) {
      if (error) {
        console.error('Error deleting access token: ', error);
        return;
      }
      console.log('This is the DELETE response: ', response2);
      req.logout();
      res.redirect('/login');
      return;
    });
    // request({
    //   uri: `http://localhost:3000/v1/access_token/${response.data[0].id}`,
    //   method: 'DELETE'
    // }, function(error, message2, response2) => {
    //   if (error) {
    //     console.error('Error deleting access token: ', error);
    //     return;
    //   }
    //   // Logout and redirect after deleting access token
    //   return;
    // })
    // return cb(null, profile);
  });

  // request({
  //   uri: `http://localhost:3000/v1/access_tokens?access_token=${req.user.access_token}`,
  //   method: 'DELETE',
  //   json: true,
  //   body: {
  //     githubId: profile.id,
  //     username: profile.username 
  //   }
  // }, function(err, message, response) {
  //   if (err) {
  //     console.error('error: ', err);
  //     return cb(err);
  //   }
  //   console.log('Your response: ', response);
  //   profile.nodalToken = response.data[0].access_token;
  //   return cb(null, profile);
  // })

  // req.logout();
  // res.redirect('/login');
};

exports.other = (req, res) => {
  if (!path.extname(req.url)) {res.end('Path not available. Try another url');}
  res.sendFile(path.resolve(__dirname + '/../../../client/app/' + req.params[0]));
};
