const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const request = require('request');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;
const regularAuthHandler = require('./regularAuth-handler.js');

var configPath = !!process.env.LOAD_SAMPLE ? '../../sample.config.env' : '../../config.env';

require('env2')(configPath); // import environment variables
// app.use(express.static(__dirname + '/../../../client/app', {
//   extensions: ['html']
// }));

// enable expression session and cookies 
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

passport.serializeUser(function(user, cb) {
  console.log('the user: ', user);
  // specify items to attach to user session
  cb(null, { id: user.id, username: user.username, "img": user.photos[0].value, "access_token": user.nodalToken });
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {

    // make POST request
    // request.post('http://localhost:3000/v1/access_tokens')
    // .form({'username': 'public'})
    // .on('response', function(response) {
    //   console.log('This is the response: ', JSON.stringify(response, null, ' '));
    // })
    request({
      uri: 'http://localhost:3000/v1/access_tokens',
      method: 'POST',
      json: true,
      body: {
        githubId: profile.id,
        username: profile.username 
      }
    }, function(err, message, response) {
      if (err) {
        console.error('error: ', err);
        return cb(err);
      }
      console.log('Your response: ', response);
      profile.nodalToken = response.data[0].access_token;
      return cb(null, profile);
    })
    
  }
));

app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   if (!req.session) {
//     res.redirect('/login');
//   } else {
//     res.end();
//   }
// });

// app.get('/login', (req, res) => {
//   let options = {
//     root: __dirname +'/../../../client/app' || __dirname + '/../../../client/app/dist',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   }
//   res.sendFile('login.html', options, (err) => {
//     if (err) {
//       console.error('error!', err);
//     }
//     console.log('sent!')
//   });
// })

app.get('/', ensureAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../../client/app/login.html'));
})

// **************************************************************************
//                        Github/passport Auth Route 
// **************************************************************************
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.isAuthenticated());
    res.redirect('/');
  }
);

// **************************************************************************
//                         Regular user Auth Route
// **************************************************************************
app.post('/auth/regular', regularAuthHandler.regularAuth);

// **************************************************************************
//                      after seccussful user login
// **************************************************************************
app.get('/auth', (req, res) => {
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
});

app.get('/logout', function(req, res){
  // Destroy Access Token in database
  if (req.session.dotBind) {
    req.user = req.session.dotBind;
  }

  if (req.user.username === 'public') {
    req.logout();
    res.redirect('/login');
    return;
  }
  request({
    uri: `http://localhost:3000/v1/users?username=${req.user.username}`,
    method: 'GET'
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
})

// displays other associated assets -- bundle.js
// and deals with wildcard routes
app.get(/^(.+)$/, function(req, res) {
  if (!path.extname(req.url)) {res.end('Path not available. Try another url');}
  res.sendFile(path.resolve(__dirname + '/../../../client/app/' + req.params[0]));
});

// custom middleware function to make sure the user is logged in when accessing home page
function ensureAuthenticated(req, res, next) {
/*req.isAuthenticated() is created when user logs in as regular users
  req.session is created when user logs in as regular users */
  if (req.session.dotBind || req.isAuthenticated() || req.path === '/auth/github') { return next(); }
  res.redirect('/login')
}

module.exports = app;
