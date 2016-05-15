const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const request = require('request');

const configPath = !!process.env.LOAD_SAMPLE ? '../../sample.config.env' : '../../config.env';

require('env2')(configPath); // import environment variables
// app.use(express.static(__dirname + '/../../../client/app', {
//   extensions: ['html']
// }));

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

module.exports = passport;