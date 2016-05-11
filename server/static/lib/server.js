const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const GitHubStrategy = require('passport-github').Strategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const ENV = require('../.env');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../../../client/app', {
  extensions: ['html']
}));

passport.use(new GitHubStrategy({
    clientID: ENV.GITHUB_CLIENT_ID,
    clientSecret: ENV.GITHUB_CLIENT_SECRET,
    callbackURL: ENV.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {

    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
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


app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.session);
    // res.location('/');
    // res.json(req.session)
    res.redirect('/');
  }
);
app.get('/test', (req, res) => {
  res.end('hey');
})

app.listen(port, () => console.log('Listening on port ' + port));
