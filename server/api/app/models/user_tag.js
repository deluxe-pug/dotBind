module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  class UserTag extends Nodal.Model {}

  UserTag.setDatabase(Nodal.require('db/main.js'));
  UserTag.setSchema(Nodal.my.Schema.models.UserTag);

  return UserTag;

})();
