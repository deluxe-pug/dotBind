const express = require('express');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;
const passport = require('./passport-config.js');
const regularAuthHandler = require('./regularAuth-handler.js');
const handlers = require('./request-handlers.js');

const utils = require('./utils.js')

// **************** enable middlewares ****************
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize());
app.use(passport.session());

// **************** configure routes ****************
app.get('/', utils.ensureAuthenticated, handlers.index);
app.get('/login', handlers.login);
// Github/passport Auth Route 
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.isAuthenticated());
    res.redirect('/');
  }
);
// Regular user Auth Route
app.post('/auth/regular', handlers.regularAuth);
// after seccussful user login
app.get('/auth', handlers.auth);
app.get('/logout', handlers.logout);

// displays other associated assets -- bundle.js
// and deals with wildcard routes
app.get(/^(.+)$/, handlers.other);

module.exports = app;
