const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const ENV = require('../.env');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../../../client/app', {
  extensions: ['html']
}));

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

    return cb(null, profile);
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




app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.isAuthenticated());

    res.redirect('/');
  }
);
app.get('/test', (req, res) => {
  console.log('this is the user object on req: ', req.user);
  console.log('This is the session object on req', req.session);
  res.end('hey');
})

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/login');
// })

app.listen(port, () => console.log('Listening on port ' + port));
