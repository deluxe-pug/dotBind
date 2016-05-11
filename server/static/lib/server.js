const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const ENV = require('../.env');
const session = require('express-session');
const request = require('request');
const cookieParser = require('cookie-parser')
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// app.use(express.static(__dirname + '/../../../client/app', {
//   extensions: ['html']
// }));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(cookieParser());

passport.serializeUser(function(user, cb) {
  console.log('the user: ', user);

  cb(null, { id: user.id, username: user.username, "img": user.photos[0].value, "access_token": user.nodalToken });
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));

passport.serializeUser(function(user, cb) {
  console.log('the user: ', user);
  cb(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: ENV.GITHUB_CLIENT_ID,
    clientSecret: ENV.GITHUB_CLIENT_SECRET,
    callbackURL: ENV.callbackURL
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


app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.isAuthenticated());

    res.redirect('/');
  }
);

app.get('/auth', (req, res) => {
  console.log('this is the user object on req: ', req.user);
  console.log('This is the session object on req', req.session);
  res.send(req.user);
})

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
})

// displays other associated assets -- bundle.js
// and deals with wildcard routes
app.get(/^(.+)$/, function(req, res) { 
  if (!path.extname(req.url)) {res.end('Path not available. Try another url');}
  res.sendFile(path.resolve(__dirname + '/../../../client/app/' + req.params[0]));
})

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/login');
// })

app.listen(port, () => console.log('Listening on port ' + port));



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() || req.path === '/auth/github') { return next(); }
  res.redirect('/login')
}
