const request = require('request');
const cat = require('octodex'); // generates a random octocat image

exports.regularAuth = (req, res) => {
  // hit the nodal validating user end point
  const email = req.body.email;
  const password = req.body.password;
  const username = email.split('@')[0] // map to Github email if found in database [should also be done opposite direction] or 

  request({
    uri: 'http://localhost:3000/v1/access_tokens',
    method: 'POST',
    json: true,
    body: {username, password, email}
  }, (err, message, response) => {
    if (err) {
      console.error('Error POSTing to access_token: ', err);
      return;
    }
    const access_token = username === 'public' ? 'dotBind' : response.data[0].access_token;
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
