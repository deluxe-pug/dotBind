module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const AccessToken = Nodal.require('app/models/access_token.js');

  class V1AccessTokensController extends Nodal.Controller {

    create() {
      AccessToken.login(this.params, (err, accessToken) => {
        this.respond(err || accessToken);
      });
    }

  }

  return V1AccessTokensController;

})();
