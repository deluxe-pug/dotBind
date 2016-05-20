const path = require('path');
const request = require('request');
const cat = require('octodex'); // generates a random octocat image
const getTitleFromHtml = require('./utils.js').getTitleFromHtml;
const getDomainFromUrl = require('./utils.js').getDomainFromUrl;

exports.regularAuth = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const username = email.split('@')[0]; // map to Github email if found in database & vice versa
  const avatar = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png';

  request({
    uri: 'http://localhost:3000/v1/access_tokens',
    method: 'POST',
    json: true,
    body: {username, password, email, avatar}
  }, (err, message, response) => {
    if (err) {
      console.error('Error POSTing to access_token: ', err);
      return;
    }
    const access_token = username === 'public' ? 'dotBind' : response.data[0] ? response.data[0].access_token : 'dotBind';
    console.log('Your response from POSTing to access_tokens: ', response);
    // if the user is valid
      // set up session with username and token
    cat.img((err, octoUrl) => {
      req.session.dotBind = {};
      req.session.dotBind.username = username;
      req.session.dotBind.access_token = access_token;
      req.session.dotBind.img = octoUrl;

      // redirect to home page
      res.redirect('/');
      return;
    // if the user is not valid
      // send back response 'user not valid'
    }, true);
  });
};

exports.index = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/index.html'));
};

exports.login = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/login.html'));
};

exports.chrome = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/chrome' + process.env.CHROME));
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

exports.invalid = (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/404.html'));
}

exports.logout = (req, res) => {
  // Destroy Access Token in database
  if (req.session.dotBind) {
    req.user = Object.assign({}, req.session.dotBind);
  }

  if (req.user.username === 'public') {
    req.logout();
    req.session.dotBind = null;
    res.redirect('/login');
    return;
  }

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
      req.session.dotBind = null;
      res.redirect('/login');
      return;
    });
  });
};

exports.fetchsite = (req, res) => {
  console.log('FETCHSITE IS CALLED IN STATIC SERVER')
  request({
    uri: req.query.url,
    method: 'GET'
  }, function(error, message, response) {

    const domain = getDomainFromUrl(req.query.url);
    const title = getTitleFromHtml(response);
    const accessToken = req.query.accessToken;

    const resObj = {
      card: {
        url: req.query.url,
        title: title,
        code: '',
        note: '',
        domain: domain,
        icon: `http://www.google.com/s2/favicons?domain=${domain}`,
      },
      username: req.query.username,
      tags: [] 
    };

    console.log('resObj in static server: ', resObj);

    request({
      uri: `http://localhost:3000/v1/cards?access_token=${accessToken}`,
      method: 'POST',
      json: true,
      body: resObj
    }, function(error, message, response) {
      console.log('FETCHSITE RESPONSE: ', response);
      if (error) {
        console.log('Error in fetchsite: ', error);
      }
      res.json(response);
    })

  });
};

exports.other = (req, res) => {
  if (!path.extname(req.url)) {res.redirect('/404');}
  res.sendFile(path.resolve(__dirname + '/../../../client/app/' + req.params[0]));
};

